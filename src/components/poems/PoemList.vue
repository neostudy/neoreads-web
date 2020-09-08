<template>
  <div id="books-pane">
    <el-container>
      <el-header class="title-pane" height="50px">
        <span class="title">{{fav ? "我的收藏" : "全部诗歌"}}</span>
        <span class="number">（{{num}}）</span>
        <span class="right">
          <el-divider direction="vertical"></el-divider>按名称排序
          <faicon icon="sort" title="排序"></faicon>
        </span>
        <span class="right">
          <el-button
            v-show="fav"
            type="primary"
            size="small"
            icon="el-icon-refresh"
            @click="shufflePoems"
          >随机</el-button>
          <el-button
            v-show="fav"
            type="primary"
            size="small"
            icon="el-icon-search"
            @click="discoverPoems"
          >发现</el-button>
          <el-button
            v-show="!fav"
            type="primary"
            size="small"
            icon="el-icon-star-on"
            @click="myPoems"
          >我的收藏</el-button>
          <el-button type="primary" size="small" icon="el-icon-circle-plus" @click="addPoem">添加</el-button>
        </span>
      </el-header>
      <el-main>
        <div class="book-list">
          <div class="book-item-wrap" v-for="(p, i) in poems" :key="i">
            <poem-card :poem="p" @star-changed="onStarChanged"></poem-card>
          </div>
        </div>
      </el-main>
    </el-container>

    <div></div>
  </div>
</template>

<script>
import PoemCard from "./PoemCard.vue";
import { EVENT_BUS } from "src/eventbus.js";

function randomIndexes(max, size) {
  let idxs = new Set(); 
  while (idxs.size < size) {
    let idx = Math.floor(Math.random()*max)
    idxs.add(idx);
  }
  console.log("idex: ", Array.from(idxs))
  return Array.from(idxs);
}

export default {
  props: ["fav"],
  components: {
    PoemCard
  },
  data() {
    return {
      filter: null,
      poems: [],
      allPoems: []
    };
  },
  computed: {
    num() {
      return this.poems.length;
    }
  },
  created() {
    // 初始化诗歌列表
    this.searchPoems();
    // TODO: 添加默认搜索条件
    EVENT_BUS.$on("poems-filter", f => {
      this.filter = f;
    });
  },
  watch: {
    filter() {
      this.searchPoems();
    }
  },
  methods: {
    shufflePoems() {
      let size = this.allPoems.length;
      let idxs = randomIndexes(size, 5);
      let shuffledPoems = [];
      for (let idx of idxs) {
        shuffledPoems.push(this.allPoems[idx]);
      }
      this.poems = shuffledPoems;
    },
    searchPoems() {
      let s = "?";
      if (this.filter) {
        if (this.filter.kind == "author") {
          s = s + "pid=" + this.filter.value.id;
        }
      }
      if (s == "?") s = "";

      if (this.fav) {
        this.authGet("/api/v1/articles/poems/fav" + s)
          .then(res => {
            let poems = res.data;
            poems.forEach(p => {
              if (p.star == undefined) {
                p.star = {
                  value: 0
                };
              }
            });
            this.poems = poems;
            this.allPoems = poems;
            this.loadStars();
          })
          .catch(err => {
            console.log("error getting poems: " + err);
          });
      } else {
        this.$axios
          .get("/api/v1/articles/poems/search" + s)
          .then(res => {
            let poems = res.data;
            poems.forEach(p => {
              if (p.star == undefined) {
                p.star = {
                  artid: p.id,
                  value: 0
                };
              }
            });
            this.poems = poems;
            this.allPoems = poems;
            this.loadStars();
          })
          .catch(err => {
            console.log("error getting poems: " + err);
          });
      }
    },
    loadStars() {
      let ids = this.poems.map(p => p.id);
      this.authPost("/api/v1/note/mystars/article", ids).then(res => {
        let stars = res.data;
        let smap = {};
        for (let star of stars) {
          let artid = star.artid;
          smap[artid] = star;
        }
        for (let p of this.poems) {
          if (p.id in smap) {
            let star = smap[p.id];
            p.star = star;
          } else {

          }
        }
      });
    },
    onStarChanged(delta) {
      if (delta.value > 0) delta.value = 1;
      if (delta.value < 0) delta.value = -1;
      var json = {
        id: delta.id,
        ntype: 0, // star
        ptype: 3, // position type: article
        colid: delta.colid,
        artid: delta.artid,
        paraid: "",
        sentid: "",
        value: delta.value
      };
      return this.authPost("/api/v1/note/star", json).then(res => {
        let star = res.data;
        this.poems.forEach(p => {
          if (p.id == star.artid) {
            p.star = res.data;
          }
        });
      });
    },
    discoverPoems() {
      this.$router.push("/poems/discover");
    },
    myPoems() {
      this.$router.push("/poems");
    },
    addPoem() {
      this.$router.push("/poems/edit");
    },
    bookRemoved(colid) {
      this.books = this.books.filter(c => c.id != colid);
    },
    editBook(book) {
      this.$router.push("/works/collaborations/edit/" + book.id);
    },
    unwatch(book) {},
    detailUrl(book) {
      this.$router.push(`/works/collaborations/detail/${book.id}/toc`);
    }
  }
};
</script>

<style lang="stylus" scoped>
#books-pane
  text-align left
  padding 0

  .title-pane
    border-bottom 1px solid #eee
    height 50px
    line-height 50px

    span.title
      font-weight bold
      font-size 1.2em

    span.number
      color #999

    span.right
      float right

  .book-item-wrap
    display block
</style>
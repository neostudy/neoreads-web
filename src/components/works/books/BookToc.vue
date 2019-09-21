<template>
  <div class="toc-container">
    <div v-bar class="toc-vbar">
      <ul class="toc-list">
        <li class="toc-item" v-for="(ch, i) in chapters" :key="i">
          <a class="chapter-link" @click="viewChapter(ch)">{{ch.title}}</a>
          <span class="edit">
            <faicon icon="edit" @click="editChapter(ch)"></faicon>
          </span>
          <span class="edit">
            <faicon icon="language" title="翻译" @click="translateChapter(ch)"></faicon>
          </span>

        </li>
      </ul>
      <!--
      <div class="toc-tree">
        <el-tree
          class="filter-tree"
          :data="data"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          @node-click="tocSelected"
          ref="tree"
        ></el-tree>
      </div>
      -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookid: this.$route.params.bookid, 
      chapters:[],
    };
  },
  created() {
    // fetch book info
    this.authGet("/api/v1/books/get/" + this.bookid).then(res => {
      console.log("got book", res.data);
      this.chapters = res.data.toc;
    });
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    tocdata(val) {
      // transform toc data into tree data
      this.data = [];
      for (let ch of this.tocdata) {
        var node = {};
        node.id = ch.id;
        node.label = ch.title;
        node.children = [];
        this.data.push(node);
      }
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    tocSelected(entry, node, comp) {
      console.log(entry);
      let bookid = this.$route.params.bookid;
      let chapid = entry.id;
      this.$emit("toc-change", chapid);
      this.$router.push("/reader/" + bookid + "/" + chapid);
    },
    toggleSearch() {
      if (this.showFilter) {
        this.filterText = "";
      }
      this.showFilter = !this.showFilter;
    },
    viewChapter(chapter) {
      this.$router.push('/reader/' + this.bookid + '/' + chapter.id)
    },
    editChapter(chapter) {
      this.$router.push(`/works/books/edit/${this.bookid}/${chapter.id}`)
    },
    translateChapter(chapter) {
      this.$router.push(`/translater/book/${this.bookid}/${chapter.id}`)
    }
  }
};
</script>

<style lang="stylus">
.toc-vbar.vb > .vb-dragger
  left 0
</style>
<style lang="stylus" scoped>
.toc-container
  padding 20px
  max-height 890px

  span
    margin-left 5px

  ul.toc-list
    text-align left

    li.toc-item
      padding 10px

      a.chapter-link
        cursor pointer

      a.chapter-link:hover
        color #208EFF

      .edit
        float right
        margin-right 5px
        cursor pointer

//    li:nth-child(odd)
//      background-color #eee

    li:hover
      background-color #E2F0FF
    

</style>

<template>
  <div id="collections-pane">
    <el-container>
      <el-header class="title-pane" height="50px">
        <span class="title">我的文集</span>
        <span class="right">
          <el-divider direction="vertical"></el-divider>按时间排序
          <faicon icon="sort" title="排序"></faicon>
        </span>
        <span class="right">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-circle-plus"
            @click="addCollection"
          >新建文集</el-button>
        </span>
      </el-header>
      <el-main>
        <div class="collection-list">
          <div class="collection-item-wrap" v-for="(c, i) in collections" :key="i">
            <collection-card :collection="c" @collection-removed="collectionRemoved"></collection-card>
          </div>
        </div>
      </el-main>
    </el-container>

    <div></div>
  </div>
</template>

<script>
import CollectionCard from "./collections/CollectionCard.vue";
export default {
  components: {
    CollectionCard
  },
  data() {
    return {
      collections: []
    };
  },
  created() {
    this.authGet("/api/v1/collections/list")
      .then(res => {
        console.log("got collections:", res.data);
        this.collections = res.data;
      })
      .catch(err => {
        console.log("error getting collections: " + err);
      });
  },
  methods: {
    addCollection() {
      this.$router.push("/works/collections/edit/");
    },
    collectionRemoved(colid) {
      this.collections = this.collections.filter(c => c.id != colid);
    }
  }
};
</script>

<style lang="stylus" scoped>
#collections-pane
  text-align left
  padding 0

  .title-pane
    border-bottom 1px solid #eee
    height 50px
    line-height 50px

    span.title
      font-weight bold
      font-size 1.2em

    span.right
      float right
</style>
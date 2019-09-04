<template>
  <div class="collection-item">
    <el-row>
      <el-col :span="8">
        <div class="collection-side">
          <div class="collection-title">
            {{collection.title}}
            <span class="right">
              <faicon icon="trash" title="删除" class="right" @click="removecollection"></faicon>
            </span>
            <span class="right">
              <faicon icon="pen" title="编辑" @click="editcollection" size="sm"></faicon>
            </span>
          </div>
          <div class="collection-intro">{{collection.intro}}</div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="collection-toolbar">
          <span>文章列表</span>
        </div>
        <div class="collection-articles">
          <div class="collection-select-pane">
            <el-table
              ref="multipleTable"
              :data="articles"
              tooltip-effect="dark"
              style="width: 100%"
            >
              <el-table-column prop="title" label="文章标题" width="600"></el-table-column>
              <el-table-column label="最近更新">
                <template slot-scope="scope">{{ scope.row.modtime }}</template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>


<script>
export default {
  props: ["collection"],
  data() {
    return {
      articles: []
    };
  },
  computed: {},
  created() {
    // fetch articles for selection
    this.authGet("/api/v1/articles/collection/" + this.collection.id).then(res => {
      this.articles = res.data;
    });
  },
  methods: {
    editcollection() {
      this.$router.push("/works/collections/edit/" + this.collection.id);
    },
    removecollection() {
      this.$confirm("确认删除文集？")
        .then(_ => {
          this.authGet("/api/v1/collections/remove/" + this.collection.id).then(
            res => {
              this.$message("文集删除成功");
              this.$emit("collection-removed", this.collection.id);
            }
          );
        })
        .catch(_ => {});
    }
  }
};
</script>


<style lang="stylus" scoped>
.collection-item
  margin-bottom 20px
  border-bottom 1px solid #eee

  .collection-side
    padding 0 20px

    .collection-title
      font-weight bold
      font-size 1.2em
      padding 10px
      border-bottom 1px dashed #eee

      span.right
        float right
        margin-left 10px

        svg
          color #409eff
          cursor pointer

    .collection-intro
      padding 10px
      font-size 1em
      min-height 200px
      max-height 400px

  .collection-articles
    min-height 200px
    max-height 400px

  .collection-toolbar
    padding 10px
    line-height 30px
    height 30px
    border-bottom 1px dashed #eee

    span
      margin-right 20px

      svg
        color #409eff
        cursor pointer

      label
        margin-left 4px

    span.right
      float right
      margin-right 0px
      margin-left 10px

    span.modtime
      font-size 0.9em
      color #666
</style>
<style lang="stylus">
.collection-content
  h1, h2, h3, h4, p
    margin-bottom 20px

  blockquote
    border-left 3px solid #d4d4d4
    padding-left 10px
    color #888

.v-note-wrapper
  max-height 800px
</style>
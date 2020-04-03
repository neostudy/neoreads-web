<template>
  <div id="articles-pane">
    <el-container>
      <el-header class="title-pane" height="50px">
        <span class="title">作者百科</span>
        <span class="right">
          <el-divider direction="vertical"></el-divider>按热门度排序
          <faicon icon="sort" title="排序"></faicon>
        </span>
        <span class="right">
          <el-button type="primary" size="small" icon="el-icon-plus" @click="editAuthor">添加作者信息</el-button>
        </span>
      </el-header>
      <el-main class="article-list-pane">
        <div v-bar>
          <div class="article-list-vbar">
            <div class="article-list">
              <div class="article-item-wrap" v-for="(p, i) in people" :key="i">
                <person-card :person="p"></person-card>
              </div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import PersonCard from "./PersonCard.vue";
export default {
  components: {
    PersonCard
  },
  data() {
    return {
      people: []
    }
  },
  created() {
    this.$axios.get("/api/v1/people/list").then(res => {
      this.people = res.data
    })

  },
  methods: {
    editAuthor() {
      this.$router.push("/people/authors/edit");
    }
  }
}
</script>

<style lang="stylus" scoped>
#articles-pane
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

  .article-list-pane
    padding 20px 0 20px 20px

    .article-list-vbar
      max-height 760px

      .article-list
        padding-right 20px
</style>
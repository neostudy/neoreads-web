<template>
  <div id="write-pane">
    <el-container>
      <el-header class="title-pane" height="50px">
        <span class="title">写文章</span>
      </el-header>
      <el-main>
        <div class="write-title-pane">
          <el-input size="large" class="write-title" v-model="title" placeholder="请输入标题"></el-input>
        </div>
        <div class="write-editor-pane">
          <mavon-editor v-model="content" placeholder="请输入正文..." :boxShadow="false"></mavon-editor>
          <br />
          <el-button type="primary" @click="save">保存</el-button>
          <el-button @click="cancel()">取消</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      artid: this.$route.params.artid,
      title: "",
      content: ""
    };
  },
  computed: {
    isEdit() {
      return !!this.artid;
    }
  },
  created() {
    if (this.isEdit) {
      // fetch article content
      this.authGet("/api/v1/articles/get/" + this.artid).then(res => {
        let article = res.data;
        this.title = article.title;
        this.content = article.content;
      });
    }
  },
  methods: {
    save() {
      if (!this.title) {
        this.$alert("标题未填写", "注意：");
      } else if (!this.content) {
        this.$alert("内容未填写", "注意：");
      } else {
        let url = "/api/v1/articles/add";
        let data = {
          title: this.title,
          content: this.content
        };
        if (this.isEdit) {
          url = "/api/v1/articles/modify";
          data.id = this.artid;
        }
        this.authPost(url, data)
          .then(res => {
            this.$message("文章保存成功");
            this.goArticles();
          })
          .catch(error => {
            this.$message("文章保存失败：" + error);
          });
      }
    },
    cancel() {
      if (this.title || this.content) {
        this.$confirm("文章未保存，确认退出？")
          .then(_ => {
            this.goArticles();
          })
          .catch(_ => {});
      } else {
        this.goArticles();
      }
    },
    goArticles() {
      this.$router.push("/works/articles");
    }
  }
};
</script>


<style lang="stylus" scoped>
#write-pane
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

  .write-title-pane
    margin-bottom 10px
</style>
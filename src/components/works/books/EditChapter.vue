<template>
  <div id="write-pane">
    <el-container>
      <el-header class="title-pane" height="50px">
        <span class="title">编辑章节</span>
      </el-header>
      <el-main>
        <div class="write-title-pane">
          <el-input size="large" class="write-title" v-model="chapter.title" placeholder="请输入章节标题"></el-input>
        </div>
        <div class="write-editor-pane">
          <mavon-editor
            id="write-mavon-editor"
            v-model="chapter.content"
            placeholder="请输入章节正文..."
            :boxShadow="false"
          ></mavon-editor>
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
      chapter: {
        id: this.$route.params.chapid,
        bookid: this.$route.params.bookid,
        title: '',
        content: ''
      }
    };
  },
  computed: {
    isEdit() {
      return !!this.chapter.id;
    }
  },
  created() {
    if (this.isEdit) {
      // fetch chap content
      this.authGet(`/api/v1/books/chapter/get/${this.chapter.bookid}/${this.chapter.id}`).then(
        res => {
          this.chapter = res.data;
        }
      );
    }
  },
  methods: {
    save() {
      if (!this.chapter.title) {
        this.$alert("标题未填写", "注意：");
      } else if (!this.chapter.content) {
        this.$alert("内容未填写", "注意：");
      } else {
        let url = "/api/v1/books/chapter/add";
        let data = this.chapter;
        if (this.isEdit) {
          url = "/api/v1/books/chapter/modify";
        }
        this.authPost(url, data)
          .then(res => {
            this.$message("文章保存成功");
            this.goBack();
          })
          .catch(error => {
            this.$message("文章保存失败：" + error);
          });
      }
    },
    cancel() {
      if (this.chapter.title || this.chapter.content) {
        this.$confirm("文章未保存，确认退出？")
          .then(_ => {
            this.goArticles();
          })
          .catch(_ => {});
      } else {
        this.goArticles();
      }
    },
    goBack() {
      this.$router.go(-1);
      // this.$router.push("/works/articles");
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

#write-mavon-editor
  min-height 500px
  max-height 650px
</style>
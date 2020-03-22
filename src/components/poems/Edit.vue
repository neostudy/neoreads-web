<template>
  <div>
    <div class="center-pane">
      <div id="write-pane">
        <el-container>
          <el-header class="title-pane" height="50px">
            <span class="title">编辑诗歌</span>
            <span></span>
          </el-header>
          <el-main>
            <div class="write-title-pane">
              <el-input size="large" class="write-title" v-model="title" placeholder="请输入标题"></el-input>
            </div>
            <div class="poem-authors-pane">
              <multiselect
                v-model="authors"
                label="fullname"
                track-by="id"
                :options="authorOptions"
                :searchable="true"
                :close-on-select="false"
                :show-labels="false"
                :multiple="true"
                :taggable="true"
                @tag="addAuthor"
                @search-change="searchAuthor"
                placeholder="选择或新建作者"
              ></multiselect>
            </div>
            <div class="write-editor-pane">
              <mavon-editor
                id="write-mavon-editor"
                v-model="content"
                placeholder="请输入诗文..."
                :boxShadow="false"
              ></mavon-editor>
              <br />
              <el-button type="primary" @click="save">保存</el-button>
              <el-button @click="cancel()">取消</el-button>
            </div>
          </el-main>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
export default {
  components: {
    Multiselect
  },
  data() {
    return {
      artid: this.$route.params.artid,
      title: "",
      content: "",
      // author
      authors: [],
      authorOptions: [],
      isAuthorDialogVisible: false,
      newAuthor: ""
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
        this.kind = 2; // kind=2表示诗歌
        this.title = article.title;
        this.content = article.content;
      });
    }
    // fetch authors
    this.$axios.get("/api/v1/people/list").then(res => {
      this.authorOptions = res.data;
    });
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
          kind: 2,
          content: this.content,
          pid: this.packAuthors()
        };
        if (this.isEdit) {
          url = "/api/v1/articles/modify";
          data.id = this.artid;
        }
        this.authPost(url, data)
          .then(res => {
            this.$message("诗歌保存成功");
            this.goBack();
          })
          .catch(error => {
            this.$message("诗歌保存失败：" + error);
          });
      }
    },
    cancel() {
      if (this.title || this.content) {
        this.$confirm("诗歌未保存，确认退出？")
          .then(_ => {
            this.goBack();
          })
          .catch(_ => {});
      } else {
        this.goBack();
      }
    },
    goBack() {
      this.$router.push("/poems/");
    },
    addAuthor(author) {
      this.newAuthor = author;
      this.isAuthorDialogVisible = true;
    },
    authorAdded(author) {
      this.isAuthorDialogVisible = false;
      this.authorOptions.push(author);
      this.authors.push(author);
    },
    searchAuthor(name) {
      console.log("searching for author:", name);
    },
    packAuthors() {
      return this.authors.map(a => a.id).join(",")
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

  .poem-authors-pane
    margin-bottom 10px

  .write-kind-pane
    margin-bottom 10px

#write-mavon-editor
  min-height 500px
  max-height 650px
  z-index 20
</style>
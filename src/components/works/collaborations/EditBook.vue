<template>
  <div id="book-edit-pane">
    <el-container>
      <el-header class="title-pane" height="50px">
        <span v-if="isEdit" class="title">编辑书籍</span>
        <span v-if="!isEdit" class="title">创作新书</span>
      </el-header>
      <el-main>
        <el-form ref="book-form" :model="book">
          <el-container>
            <el-aside class="book-cover-pane" width="190px">
              <span v-if="!coverUrl">
                <faicon style="color: #409EFF;" size="lg" @click="openImgUpload" icon="upload"></faicon>&nbsp;
                <span @click="openImgUpload">上传封面</span>
              </span>

              <img v-if="coverUrl" :src="coverUrl" @click="openImgUpload" />
              <img-upload
                field="file"
                @crop-success="onCropSucc"
                @crop-upload-success="onCropUploadSucc"
                @crop-upload-fail="onCropUploadFail"
                v-model="showImgUpload"
                :width="188"
                :height="265"
                url="/api/v1/upload/img"
                :params="params"
                :headers="headers"
                img-format="png"
              ></img-upload>
            </el-aside>
            <el-main class="book-info-pane">
              <div class="book-title-pane">
                <el-form-item>
                  <el-input
                    size="large"
                    class="book-title"
                    v-model="book.title"
                    placeholder="请输入书名"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="book-intro-pane">
                <el-form-item>
                  <el-input
                    size="large"
                    class="book-intro"
                    type="textarea"
                    :rows="9"
                    v-model="book.intro"
                    placeholder="请输入简介"
                  ></el-input>
                </el-form-item>
              </div>
            </el-main>
          </el-container>
          <div class="book-authors-pane">
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
          <div class="book-tags-pane">
            <multiselect
              v-model="book.tags"
              :options="tagOptions"
              :searchable="true"
              :close-on-select="false"
              :show-labels="false"
              :multiple="true"
              :taggable="true"
              @search-change="fetchTags"
              @tag="addTag"
              placeholder="选择或新建书籍标签"
            ></multiselect>
            <el-dialog width="68%" title="作者信息" :visible.sync="isAuthorDialogVisible">
              <edit-author :name="newAuthor" @author-added="authorAdded"></edit-author>
            </el-dialog>
          </div>
          <div class="book-toc-pane">
            目录
            <toc-editor v-model="book.toc"></toc-editor>
          </div>
          <div class="book-toolbar">
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="cancel()">取消</el-button>
          </div>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import ImgUpload from "vue-image-crop-upload";
import Multiselect from "vue-multiselect";
import TocEditor from "../books/TocEditor";
import EditAuthor from "../../people/EditAuthor.vue";
export default {
  components: {
    ImgUpload,
    Multiselect,
    TocEditor,
    EditAuthor
  },
  data() {
    return {
      book: {
        id: this.$route.params.bookid,
        cover: "",
        title: "",
        intro: "",
        tags: [],
        toc: []
      },
      params: {},
      headers: {},
      showImgUpload: false,
      // tag options
      tagOptions: ["文学", "历史", "天文", "地理"],
      // author
      authors: [],
      authorOptions: [],
      isAuthorDialogVisible: false,
      newAuthor: ""
    };
  },
  computed: {
    isEdit() {
      return !!this.book.id;
    },
    coverUrl() {
      if (this.book.cover) {
        return `/res/img/${this.book.cover}_file.png`;
      } else {
        return "";
      }
    }
  },
  created() {
    this.$store.dispatch("setActiveWorksMenu", "/works/collaborations");
    this.headers["Authorization"] = `Bearer ${this.$store.getters.token}`;

    // fetch authors
    this.$axios.get("/api/v1/people/list").then(res => {
      this.authorOptions = res.data
    });

    if (this.isEdit) {
      // fetch book info
      this.authGet("/api/v1/books/get/" + this.book.id).then(res => {
        let book = res.data;
        if (!book.toc) book.toc = [];
        if (book.authorsjson) {
          book.authors = book.authorsjson;
          this.authors = book.authorsjson;
        }
        if (!book.authors) book.authors = [];
        this.book = book;
      });
    }
  },
  methods: {
    save() {
      if (!this.book.title) {
        this.$alert("标题未填写", "注意：");
      } else if (!this.book.intro) {
        this.$alert("简介未填写", "注意：");
      } else {
        let url = "/api/v1/books/add";
        let data = this.book;
        data.authors = this.authors;
        if (this.isEdit) {
          url = "/api/v1/books/modify";
        }
        this.authPost(url, data)
          .then(res => {
            this.$message("书籍信息保存成功");
            this.goToList();
          })
          .catch(error => {
            this.$message("书籍信息保存失败：" + error);
          });
      }
    },
    cancel() {
      if (this.title || this.intro) {
        this.$confirm("文集未保存，确认退出？")
          .then(_ => {
            this.goToList();
          })
          .catch(_ => {});
      } else {
        this.goToList();
      }
    },
    goToList() {
      this.$router.push("/works/collaborations");
    },
    openImgUpload() {
      this.showImgUpload = true;
    },
    onCropSucc(imgUrl, field) {
      console.log("crop succ!", field);
      //this.imgUrl = imgUrl
    },
    onCropUploadSucc(json, field) {
      console.log("upload succ!", json, field);
      let imgid = json.imgid;
      this.book.cover = imgid;
      console.log(this.book);
    },
    onCropUploadFail() {
      console.log("upload faile!");
    },
    addTag(newTag) {
      this.tagOptions.push(newTag);
      this.book.tags.push(newTag);
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
    fetchTags() {
      console.log("fetching tags");
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="stylus">
.multiselect__tag
  background-color #409EFF

.multiselect__option--highlight
  background-color #409EFF
</style>

<style lang="stylus" scoped>
#book-edit-pane
  text-align left
  padding 0

  .title-pane
    border-bottom 1px solid #eee
    height 50px

    span.title
      font-weight bold
      font-size 1.2em

    span.right
      float right

  .book-cover-pane
    text-align center
    vertical-align center
    width 190px
    height 267px
    line-height 265px
    border 1px solid #eee
    border-radius 4px
    overflow hidden

  .book-info-pane
    padding 0px
    margin-left 20px

  .book-title-pane
    margin-bottom 10px

  .book-intro-pane
    margin-top 25px
    margin-bottom 10px

    .book-intro
      padding 0px

  .book-authors-pane
    margin-bottom 10px
    height 60px
    padding 0px

  .book-tags-pane
    margin-bottom 10px
    height 60px
    padding 0px

  .book-toc-pane
    min-height 100px
    margin-bottom 10px

  .book-toolbar
    padding 0px
</style>
<template>
  <div id="book-edit-pane">
    <el-container>
      <el-header class="title-pane" height="50px">
        <span v-if="isEdit" class="title">编辑作者信息</span>
        <span v-if="!isEdit" class="title">添加作者信息</span>
      </el-header>
      <el-main>
        <el-form ref="book-form" :model="author">
          <el-container>
            <el-aside class="book-cover-pane" width="190px">
              <span v-if="!coverUrl">
                <faicon style="color: #409EFF;" size="lg" @click="openImgUpload" icon="upload"></faicon>&nbsp;
                <span @click="openImgUpload">上传人物头像</span>
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
                  <el-row>
                    <el-col :span="11">
                      <el-input
                        size="large"
                        class="book-title"
                        v-model="author.fullname"
                        placeholder="请输入作者名称"
                      ></el-input>
                    </el-col>
                    <el-col :span="12" :offset="1">
                      <el-input
                        size="large"
                        class="book-title"
                        v-model="author.othernames"
                        placeholder="请输入作者别名，以逗号分隔"
                      ></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
              </div>
              <div class="book-intro-pane">
                <el-form-item>
                  <el-input
                    size="large"
                    class="book-intro"
                    type="textarea"
                    :rows="9"
                    v-model="author.intro"
                    placeholder="请输入人物简介"
                  ></el-input>
                </el-form-item>
              </div>
            </el-main>
          </el-container>
          <div class="book-tags-pane">
            <multiselect
              v-model="author.tags"
              label="tag"
              :options="tagOptions"
              :searchable="true"
              :close-on-select="false"
              :show-labels="false"
              :multiple="true"
              :taggable="true"
              @tag="addTag"
              @search-change="searchTags"
              placeholder="选择或新建人物标签"
            ></multiselect>
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
export default {
  components: {
    ImgUpload,
    Multiselect
  },
  props: ["name"],
  data() {
    return {
      author: {
        cover: '',
        fullname: this.name,
        othernames: "",
        id: this.$route.params.id
      },
      params: {},
      headers: {},
      showImgUpload: false,
      tagOptions: []
    };
  },
  computed: {
    isEdit() {
      return !!this.author.id;
    },
    coverUrl() {
      if (!!this.author.cover) {
        return `/res/img/${this.author.cover}_file.png`;
      } else {
        return "";
      }
    }
  },
  created() {
    this.headers["Authorization"] = `Bearer ${this.$store.getters.token}`;

    if (this.author.id) {
      // fetch author info
      this.$axios
        .get(`/api/v1/people/authors/get/${this.author.id}`)
        .then(res => {
          this.author = res.data;
        });
    }

    // fetch tags
    this.$axios.get("/api/v1/tags/list?c=3").then(res => {
      this.tagOptions = res.data;
    });
  },
  methods: {
    save() {
      if (!this.author.fullname) {
        this.$alert("请填写作者名称", "注意：");
      } else if (!this.author.intro) {
        this.$alert("简介未填写", "注意：");
      } else {
        let url = "/api/v1/people/add";
        let data = this.author;
        if (this.isEdit) {
          url = "/api/v1/people/modify";
        }
        this.authPost(url, data)
          .then(res => {
            this.$message("作者信息保存成功");
            this.goToList();
          })
          .catch(error => {
            this.$message("作者信息保存失败：" + error);
          });
      }
    },
    cancel() {
      if (this.title || this.intro) {
        this.$confirm("信息未保存，确认退出？")
          .then(_ => {
            this.goToList();
          })
          .catch(_ => {});
      } else {
        this.goToList();
      }
    },
    goToList() {
      this.$router.push("/people/authors");
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
      this.author.cover = imgid;
      console.log(this.author);
      console.log(this.coverUrl);
    },
    onCropUploadFail() {
      console.log("upload faile!");
    },
    addTag(newTag) {
      this.tagOptions.push(newTag);
      this.author.tags.push(newTag);
    },
    addAuthor(author) {
      this.newAuthor = author;
      this.isAuthorDialogVisible = true;
    },
    searchAuthor(fullname) {
      console.log("searching for author:", fullname);
    },
    searchTags(fullname) {
      console.log("searching for tags:", fullname);
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
  height 600px

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

  .book-toolbar
    padding 0px
    margin-bottom 300px
</style>
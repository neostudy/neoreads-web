<template>
  <div id="write-pane">
    <el-container>
      <el-header class="title-pane" height="50px">
        <span class="title">创建记事</span>
        <span class="drafts">
          <el-button type="success">草稿箱（0）</el-button>
        </span>
      </el-header>
      <el-main>
        <div class="tags"></div>
        <div class="types">
          <el-radio-group v-model="postType" class="types-selector">
            <el-radio-button label="link">外部链接</el-radio-button>
            <el-radio-button label="post">图文记事</el-radio-button>
            <el-radio-button label="media">视频媒体</el-radio-button>
          </el-radio-group>
          <!--
          <el-row class="types-row">
            <el-col :span="8" class="types-external-link">
              
            </el-col>
            <el-col :span="8" class="types-post">B</el-col>
            <el-col :span="8" class="type-media">C</el-col>
          </el-row>
          -->
        </div>
        <div class="post-form">
          <div class="tags-select-pane">
            <el-row>
              <el-col :span="8">
                <label>话题标签：</label>
                <tag-select ref="topicTags" kind="0"></tag-select>
              </el-col>
              <el-col :span="8">
                <label>事件标签：</label>
                <tag-select ref="eventTags" kind="1"></tag-select>
              </el-col>
              <el-col :span="8">
                <label>人物标签：</label>
                <tag-select ref="peopleTags" kind="2"></tag-select>
              </el-col>
            </el-row>
          </div>

          <div class="external-link-pane" v-show="postType === 'link'">
            <label>外链地址：</label>
            <el-input size="large" class="write-title" v-model="link" placeholder="请输入链接URL">
              <template slot="prepend">https://</template>
              <el-button slot="append" icon="el-icon-search" @click="analyzeUrl">解析</el-button>
            </el-input>
          </div>
          <div class="write-title-pane">
            <label>标题：</label>
            <el-input size="large" class="write-title" v-model="title" placeholder="请输入标题"></el-input>
          </div>
          <div class="write-intro-pane" v-show="postType === 'link'">
            <label>梗概：</label>
            <el-input
              size="large"
              type="textarea"
              rows="6"
              class="write-title"
              v-model="summary"
              placeholder="请输入概要"
            ></el-input>
          </div>
          <div class="write-editor-pane" v-show="postType === 'post'">
            <label>正文：</label>
            <mavon-editor
              id="write-mavon-editor"
              v-model="content"
              placeholder="请输入正文..."
              :boxShadow="false"
            ></mavon-editor>
          </div>
          <div class="writer-toolbar">
            <el-button type="primary" @click="publish">发布</el-button>
            <el-button type="success" @click="saveDraft">保存草稿</el-button>
            <el-button @click="cancel()">取消</el-button>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { parseHostname } from "src/js/string.js";
import TagSelect from "../tools/TagSelect.vue";
export default {
  components: {
    TagSelect
  },
  data() {
    return {
      postType: "link",
      newsid: this.$route.params.newsid,
      title: "",
      link: "",
      summary: "",
      content: ""
    };
  },
  computed: {
    isEdit() {
      return !!this.newsid;
    }
  },
  created() {
    if (this.isEdit) {
      // fetch news content
      this.authGet("/api/v1/news/get/" + this.newsid).then(res => {
        let news = res.data;
        this.title = news.title;
        this.content = news.content;
      });
    }

    // load tags
    this.fetchTags();
  },
  mounted() {

  },
  methods: {
    publish() {
      let url = "/api/v1/news/add";
      let data = {
        title: this.title,
        content: this.content,
        link: this.link,
        summary: this.summary,
        kind: this.getKind(),
        source: this.getSource(),
        tags: this.getTags()
      };
      if (this.isEdit) {
        url = "/api/v1/news/modify";
        data.id = this.newsid;
      }
      this.authPost(url, data)
        .then(res => {
          this.$message("记事保存成功");
          this.goNews();
        })
        .catch(error => {
          this.$message("记事保存失败：" + error);
        });
    },
    saveDraft() {
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
            this.$message("记事保存成功");
            this.goNews();
          })
          .catch(error => {
            this.$message("记事保存失败：" + error);
          });
      }
    },
    cancel() {
      if (this.title || this.content) {
        this.$confirm("记事未保存，确认退出？")
          .then(_ => {
            this.goNews();
          })
          .catch(_ => {});
      } else {
        this.goNews();
      }
    },
    goNews() {
      this.$router.push("/news");
    },
    analyzeUrl() {},
    getKind() {
      if (this.postType === "link") {
        return 0;
      } else if (this.postType === "post") {
        return 1;
      } else if (this.postType === "media") {
        return 2;
      }
    },
    getSource() {
      if (!this.link) {
        return "";
      } else {
        let hostname = parseHostname(this.link);
        return hostname;
      }
    },
    getTags() {
      let topicTags = this.$refs.topicTags.tags
      let peopleTags = this.$refs.peopleTags.tags
      let eventTags = this.$refs.eventTags.tags
      let tags = topicTags.concat(peopleTags).concat(eventTags)
      return tags
    },
    fetchTags() {
      this.$axios.get('/api/v1/tags/news/list?t=topic').then(res => {
        this.$refs.topicTags.options = res.data;
      })
      this.$axios.get('/api/v1/tags/news/list?t=event').then(res => {
        this.$refs.eventTags.options = res.data;
      })
      this.$axios.get('/api/v1/tags/news/list?t=people').then(res => {
        this.$refs.peopleTags.options = res.data;
      })

    }
  }
};
</script>


<style lang="stylus" scoped>
#write-pane
  text-align left
  padding 0

  label
    line-height 36px

  .title-pane
    border-bottom 1px solid #eee
    height 50px
    line-height 50px

    span.title
      font-weight bold
      font-size 1.2em

    span.drafts
      float right
      font-weight bold
      font-size 1.2em

  .tags-select-pane
    margin-bottom 20px

    .el-col
      padding 0 20px 0 0

  .write-title-pane
    margin-bottom 20px

  .external-link-pane
    margin-bottom 20px

  .types-selector
    width 100%
    margin-bottom 20px
    height 50px

    label
      width 33.33%
      height 100%

  .write-intro-pane
    margin-bottom 20px

  .write-editor-pane
    margin-bottom 20px

#write-mavon-editor
  min-height 500px
  max-height 650px
</style>

<style lang="stylus">
.types-selector
  .el-radio-button__inner
    width 100%
    height 100%
    line-height 50px
    font-size 20px
    padding 0
    color #999
</style>
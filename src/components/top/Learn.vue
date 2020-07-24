<template>
  <div>
    <div class="center-pane">
      <el-row class="steps-pane">
        <el-col :span="24">
          <el-steps :active="active" finish-status="success" align-center>
            <el-step title="看"></el-step>
            <el-step title="吟"></el-step>
            <el-step title="读"></el-step>
            <el-step title="译"></el-step>
            <el-step title="评"></el-step>
            <el-step title="结"></el-step>
          </el-steps>
        </el-col>
        <el-button @click="next">下一步</el-button>
      </el-row>
      <el-row>
        <el-col :span="10">
          <div class="view-poem-pane">
            <div class="poem-title-pane">
              <span class="poem-title">{{article.title}}</span>
              <span class="author">
                <a :href="'/#/people/view/'+article.author">{{article.author}}</a>
              </span>
            </div>
            <div class="poem-content">
              <article-content :mode="viewMode" :content="article.content"></article-content>
            </div>
          </div>
        </el-col>
        <el-col :span="14">
          <article-notes></article-notes>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import ArticleContent from "../learn/ArticleContent.vue";
import ArticleNotes from "../learn/ArticleNotes.vue";
export default {
  props: {},
  components: {
    ArticleNotes,
    ArticleContent
  },
  data() {
    return {
      // dummy content
      article: {
        title: "月下独酌四首·其一",
        author: "李白",
        content:
          "花间一壶酒，独酌无相亲。 [#GKz5]举杯邀明月，对影成三人。 [#weKU]月既不解饮，影徒随我身。 [#B5r_]暂伴月将影，行乐须及春。 [#0Xpr]我歌月徘徊，我舞影零乱。 [#x-zt]醒时同交欢，醉后各分散。 [#jPOb]永结无情游，相期邈云汉。 [#LnXd] {#RPOz}\n"
      },
      active: 0,
      viewMode: 0
    };
  },
  watch: {
    active: function(n, o) {
      this.viewMode = n;
    }
  },
  methods: {
    next() {
      if (this.active > 5) {
        this.active = 5;
      } else {
        this.active += 1;
      }
    }
  }
};
</script>

<style lang="stylus">
.steps-pane
  border-bottom 1px solid #eee
  margin-bottom 20px
  padding 10px
</style>
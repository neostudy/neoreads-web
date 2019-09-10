<template>
  <div class="news-pane">
    <el-container>
      <el-main class="news-main-pane">
        <div class="news-main-title-pane">
          <label class="title-label">话题组：</label>
          <el-select size="mini" placeholder="我的订阅" v-model="tag"></el-select>
          <el-divider direction="vertical"></el-divider>
          <label class="title-label">排序：</label>
          <el-select size="mini" placeholder="综合" v-model="sort"></el-select>
          <span class="news-logo">知新：记录正在发生的历史...</span>
        </div>
        <div class="news-list">
          <scroller maxHeight="730">
            <div v-for="(n,i) in newsList" :key="i" class="news-item-pane">
              <news-card :news="n" :number="i"></news-card>
            </div>
          </scroller>
        </div>
      </el-main>
      <el-aside width="200px" class="news-side-pane">
        <div>
          <div class="side-title">
            <el-button type="primary" icon="el-icon-edit" @click="createPost">创建记事</el-button>
          </div>
        </div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import Scroller from "../tools/Scroller.vue";
import NewsCard from "./NewsCard.vue";
export default {
  components: {
    Scroller,
    NewsCard
  },
  data() {
    return {
      newsList: [
        {
          tags: [
            { name: "商业", kind: "topic" },
            { name: "马云退休", kind: "what" },
            { name: "马云", kind: "who" },
            { name: "杭州", kind: "where" }
          ],
          source: "news.163.com",
          title: "马云今卸任阿里董事局主席 曾感言卸任不等于退休",
          intro:
            "（原标题：今天 55岁马云要“退休” 将辞去阿里巴巴董事局主席职务，投身教育慈善 据传“因提前退休，津贴按65%发放”）\n 今天，是一年一度的教师节，也就是在今天，阿里巴巴集团创始人马云将正式退休。"
        },
        {
          tags: [
            { name: "国际要闻", kind: "topic" },
            { name: "特朗普", kind: "who" }
          ],
          source: "news.163.com",
          title: "枪击案频繁 美众议院议长要求特朗普支持控枪法案",
          intro:
            "中新社华盛顿9月9日电 美国国会民主党领袖、众议院议长佩洛西和参议院少数党领袖舒默当地时间9日联合致信美国总统特朗普，要求其支持控枪法案。\n 佩洛西和舒默在信中说，特朗普需要就控枪法案立即表态支持，以尽快结束美国频繁出现枪击事件的局面。特朗普的态度将决定控枪法案是否能在共和党控制的参议院通过。他们希望特朗普不要向美国全国步枪协会压力妥协，而错过这一在全美推行控枪政策的“难得机遇”"
        },
{
          tags: [
            { name: "国际要闻", kind: "topic" },
            { name: "特朗普", kind: "who" }
          ],
          source: "news.163.com",
          title: "枪击案频繁 美众议院议长要求特朗普支持控枪法案",
          intro:
            "中新社华盛顿9月9日电 美国国会民主党领袖、众议院议长佩洛西和参议院少数党领袖舒默当地时间9日联合致信美国总统特朗普，要求其支持控枪法案。\n 佩洛西和舒默在信中说，特朗普需要就控枪法案立即表态支持，以尽快结束美国频繁出现枪击事件的局面。特朗普的态度将决定控枪法案是否能在共和党控制的参议院通过。他们希望特朗普不要向美国全国步枪协会压力妥协，而错过这一在全美推行控枪政策的“难得机遇”"
        },
{
          tags: [
            { name: "国际要闻", kind: "topic" },
            { name: "特朗普", kind: "who" }
          ],
          source: "news.163.com",
          title: "枪击案频繁 美众议院议长要求特朗普支持控枪法案",
          intro:
            "中新社华盛顿9月9日电 美国国会民主党领袖、众议院议长佩洛西和参议院少数党领袖舒默当地时间9日联合致信美国总统特朗普，要求其支持控枪法案。\n 佩洛西和舒默在信中说，特朗普需要就控枪法案立即表态支持，以尽快结束美国频繁出现枪击事件的局面。特朗普的态度将决定控枪法案是否能在共和党控制的参议院通过。他们希望特朗普不要向美国全国步枪协会压力妥协，而错过这一在全美推行控枪政策的“难得机遇”"
        }
      ],

      tag: "",
      sort: ""
    };
  },
  created() {
    this.$store.dispatch("setActiveNewsMenu", "/news/home");
  },
  methods: {
    createPost() {
      this.$router.push("/news/create");
    }
  }
};
</script>

<style lang="stylus" scoped>
.news-pane
  padding 0 10px
  text-align left

  .news-main-pane
    padding 0 20px
    height 800px

    .news-main-title-pane
      border-bottom 1px solid #eee
      height 50px
      line-height 50px

      .title-label
        color #999

      .news-logo
        float right
        text-align left
        font-size 1.2em
        font-weight bold
        color #999

  .news-side-pane
    padding 10px
    min-height 200px
    max-height 800px
</style>
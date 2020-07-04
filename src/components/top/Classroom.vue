<template>
  <div>
    <div class="center-pane">
      <el-container>
        <el-main>
          <el-row>
            <el-col :span="16">
              <div class="stats-title">学习进度</div>
              <div class="stats-pane">
                <item-stats class="stats-item" v-for="n in items" :key="n.id" :i="n"></item-stats>
              </div>
            </el-col>
            <el-col :span="8" class="control-pane">
              <el-button type="primary">开始学习</el-button>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import ItemStats from "../stats/ItemStats.vue";
export default {
  components: {
    ItemStats
  },
  data() {
    return {
      items: [
        {
          id: "a",
          name: "书籍",
          count: 15,
          unit: "本",
          stars: 442
        },
        {
          id: "b",
          name: "诗歌",
          count: 121,
          unit: "首",
          stars: 342
        },
        {
          id: "c",
          name: "新闻",
          count: 45,
          unit: "条",
          stars: 131
        },
        {
          id: "d",
          name: "博文",
          count: 72,
          stars: 100,
          unit: "篇"
        }
      ]
    };
  },
  created() {
    this.$store.dispatch("setActiveMenuIndex", "/classroom");
  }
};
</script>

<style lang="stylus">
.stats-title
  text-align left
  border-bottom 1px solid #eee
  height 50px
  line-height 50px
  font-weight bold
  font-size 1.2em
  margin-right 20px

.control-pane
  min-height 500px
  border-left 1px solid #eee

.stats-pane
  text-align left
  .stats-item
    display inline-block
    width 350px
    height 200px
</style>
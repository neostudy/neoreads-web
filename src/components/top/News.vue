<template>
<div>
    <div id="news-pane" class="center-pane">
      <el-row>
        <el-col :span="2">
          <el-menu
            :default-active="newsIndex"
            class="el-menu"
            id="news-menu"
            mode="vertical"
            router
          >
            <el-menu-item index="/news/home">
              <span class="news-menu theme">
                <faicon icon="home"></faicon>
                {{$t('news.home')}}
              </span>
            </el-menu-item>
            <el-menu-item index="/news/hot">
              <span class="news-menu theme">
                <faicon icon="fire"></faicon>
                {{$t('news.hot')}}
              </span>
            </el-menu-item>
            <el-menu-item index="/news/weekly">
              <span class="news-menu theme">
                <faicon icon="newspaper"></faicon>
                {{$t('news.weekly')}}
              </span>
            </el-menu-item>
            <el-menu-item index="/news/monthly">
              <span class="news-menu theme">
                <faicon icon="moon"></faicon>
                {{$t('news.monthly')}}
              </span>
            </el-menu-item>
            <el-menu-item index="/news/yearly">
              <span class="news-menu theme">
                <faicon icon="sun"></faicon>
                {{$t('news.yearly')}}
              </span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="22">
          <div class="news-content-pane">
            <router-view></router-view>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    newsIndex() {
      return this.$store.getters.activeNewsMenu;
    }
  },
  created() {
    this.$store.dispatch("setActiveMenuIndex", "/news");
  },
  methods: {}
};
</script>

<style lang="stylus" scoped>
div.center-pane
  .el-menu-item.is-active
    border-right 2px solid #409EFF

#news-pane
  .news-menu
    font-size 1.2em

    svg
      margin-right 4px

  .news-content-pane
    padding 0 0 0 20px
</style>


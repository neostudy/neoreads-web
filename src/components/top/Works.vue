<template>
  <div>
    <div id="works-pane" class="center-pane">
      <el-row>
        <el-col :span="2">
          <el-menu
            :default-active="worksIndex"
            class="el-menu"
            id="works-menu"
            mode="vertical"
            router
          >
            <el-menu-item index="/works/articles">
              <span class="works-menu theme">
                <faicon icon="edit"></faicon>
                {{$t('works.articles')}}
              </span>
            </el-menu-item>
            <el-menu-item index="/works/collections">
              <span class="works-menu theme">
                <faicon icon="newspaper"></faicon>
                {{$t('works.collections')}}
              </span>
            </el-menu-item>
            <el-menu-item index="/works/books">
              <span class="works-menu theme">
                <faicon icon="book"></faicon>
                {{$t('works.books')}}
              </span>
            </el-menu-item>
            <el-menu-item index="/works/translations">
              <span class="works-menu theme">
                <faicon icon="globe-asia"></faicon>
                {{$t('works.translations')}}
              </span>
            </el-menu-item>
            <el-menu-item index="/works/collaborations">
              <span class="works-menu theme">
                <faicon icon="hands-helping"></faicon>
                {{$t('works.collaborations')}}
              </span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="22">
          <div class="works-content-pane">
            <router-view></router-view>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Articles from "../works/Articles.vue";

export default {
  components: {
    Articles
  },
  data() {
    return {};
  },
  computed: {
    worksIndex() {
      return this.$store.getters.activeWorksMenu;
    }
  },
  created() {
    this.$store.dispatch("setActiveMenuIndex", "/works");
  }
};
</script>

<style lang="stylus" scoped>
div.center-pane
  .el-menu-item.is-active
    border-right 2px solid #409EFF

#works-pane
  .works-menu
    font-size 1.2em

    svg
      margin-right 4px

  .works-content-pane
    padding 0 0 0 20px
</style>


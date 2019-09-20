<template>
  <div>
    <div id="people-pane" class="center-pane">
      <el-row>
        <el-col :span="2">
          <el-menu
            :default-active="peopleIndex"
            class="el-menu"
            id="people-menu"
            mode="vertical"
            router
          >
            <el-menu-item index="/people/authors">
              <span class="people-menu theme">
                <faicon icon="pen-fancy"></faicon>
                {{$t('people.authors')}}
              </span>
            </el-menu-item>
            <el-menu-item index="/people/translators">
              <span class="people-menu theme">
                <faicon icon="language"></faicon>
                {{$t('people.translators')}}
              </span>
            </el-menu-item>
            <el-menu-item index="/people/readers">
              <span class="people-menu theme">
                <faicon icon="book-reader"></faicon>
                {{$t('people.readers')}}
              </span>
            </el-menu-item>
            <el-menu-item index="/people/friends">
              <span class="people-menu theme">
                <faicon icon="user-friends"></faicon>
                {{$t('people.friends')}}
              </span>
            </el-menu-item>
            <el-menu-item index="/people/groups">
              <span class="people-menu theme">
                <faicon icon="users"></faicon>
                {{$t('people.groups')}}
              </span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="22">
          <div class="people-content-pane">
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
    peopleIndex() {
      return this.$store.getters.activePeoplesMenu;
    }
  },
  created() {
    this.$store.dispatch("setActiveMenuIndex", "/people");
  }
};
</script>

<style lang="stylus" scoped>
div.center-pane
  .el-menu-item.is-active
    border-right 2px solid #409EFF

#people-pane
  .people-menu
    font-size 1.2em

    svg
      margin-right 4px

  .people-content-pane
    padding 0 0 0 20px
</style>


<template>
  <el-dropdown @command="handleCommand" trigger="click">
    <span class="el-dropdown-link">
      <faicon icon="user" size="2x" class="user theme"></faicon>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="detail" icon="el-icon-s-custom">详细信息</el-dropdown-item>
      <el-dropdown-item command="configuration" icon="el-icon-s-tools">个人设置</el-dropdown-item>
      <el-dropdown-item command="logout" icon="el-icon-switch-button">退出登录</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  methods: {
    handleCommand(command) {
      if (command == 'logout') {
        this.logout()
      }
    },
    logout() {
      this.$store.dispatch('logout')
    }
  }
};
</script>

<style lang="stylus" scoped>
span.el-dropdown-link
  cursor pointer
</style>

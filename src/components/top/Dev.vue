<template>
<div>
  <div class="dev-pane">
    <h2>GitHub</h2>
    <br/>
    <ul>
      <li>
        <label>WEB前端</label>
        <a
          href="https://github.com/neostudy/neoreads-web"
          target="blank"
        >https://github.com/neostudy/neoreads-web</a>
      </li>
      <li>
        <label>Go语言后端</label>
        <a
          href="https://github.com/neostudy/neoreads-backend"
          target="blank"
        >https://github.com/neostudy/neoreads-backend</a>
      </li>
      <li>
        <label>APP</label>
        <a
          href="https://github.com/neostudy/neoreads"
          target="blank"
        >https://github.com/neostudy/neoreads</a>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("setActiveMenuIndex", "/dev");
  }
};
</script>

<style lang="stylus" scoped>
.dev-pane
  text-align left
  margin 0px auto
  margin-top 100px
  width 500px
  border 1px solid #eee
  padding 30px

  ul
    li
      margin-top 10px
      label
        margin-right 20px
</style>

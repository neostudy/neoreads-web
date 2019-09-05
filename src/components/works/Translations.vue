<template>
  <div>
    <h1>Translations</h1>

    <div>
      <el-button type="primary">写文章</el-button>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("setActiveWorksMenu", "/works/translations")
  }
  
}
</script>
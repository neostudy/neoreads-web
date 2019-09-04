<template>
  <div>
    <h1>Books</h1>

    <div>
      <el-button type="primary">写文章</el-button>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("setActiveWorksMenu", "/works/books")
  }
  
}
</script>
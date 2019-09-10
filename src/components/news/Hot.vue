<template>
  <div>Hot News</div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("setActiveNewsMenu", "/news/hot");
  }
}
</script>
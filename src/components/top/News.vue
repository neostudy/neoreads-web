<template>
  <div>News</div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("setActiveMenuIndex", "/news");
  }
};
</script>


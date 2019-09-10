<template>
  <div>News Yearly</div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("setActiveNewsMenu", "/news/yearly");
  }
}
</script>
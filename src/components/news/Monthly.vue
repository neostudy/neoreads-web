<template>
  <div>News Monthly</div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("setActiveNewsMenu", "/news/monthly");
  }
}
</script>
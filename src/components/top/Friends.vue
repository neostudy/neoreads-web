<template>
  <div>Friends</div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("setActiveMenuIndex", "/friends");
  }
};
</script>


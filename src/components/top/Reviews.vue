<template>
  <div>Reviews</div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("setActiveMenuIndex", "/reviews");
  }
};
</script>


<template>
    <div>Notes</div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("setActiveMenuIndex", "/works");
  }
};
</script>


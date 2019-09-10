<template>
  <div>News Weekly</div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("setActiveNewsMenu", "/news/weekly");
  }
}
</script>
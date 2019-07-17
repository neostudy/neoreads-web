<template>
  <div>Library</div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("setActiveMenuIndex", "/library");
  },
  methods: {}
};
</script>


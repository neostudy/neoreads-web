<template>
    <div>Home
</div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('setActiveMenuIndex', '/home')

  },
    methods: {
    }
    
}
</script>


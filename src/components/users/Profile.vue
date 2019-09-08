<template>
  <div>
    Hello, {{user}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: this.$route.params.user
    }
  }
}
</script>
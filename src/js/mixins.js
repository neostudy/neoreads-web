export default {
  methods: {
    authGet(url) {
      return this.$axios.get(url, {
        headers: {
          Authorization: `Bearer ${this.$store.getters.token}`
        }
      });
    },
    authPost(url, json) {
      return this.$axios.post(url, json, {
        headers: {
          Authorization: `Bearer ${this.$store.getters.token}`
        }
      });
    },
  }
}

<template>
  <div class="person-card">
    <div class="person-avatar">
      <img src="https://song.gushiwen.cn/authorImg/dufu.jpg" @click="viewPerson" />
    </div>
    <div class="person-info">
      <a class="person-link" @click="viewPerson">{{person.fullname}}</a>
      <span v-if="person.othernames">别号： {{person.othernames}}</span>
    </div>
    <div class="person-intro">{{person.intro}}</div>
  </div>
</template>

<script>
export default {
  props: ["person"],
  methods: {
    viewPerson() {
      let id = this.person.id;
      this.$router.push("/people/view/" + id);
    }
  }
};
</script>

<style lang="stylus" scoped>
.person-card
  border 1px solid #eee
  border-radius 5px
  padding 20px
  margin-bottom 20px
  min-height 150px

  .person-avatar
    float left
    height 150px
    width 105px
    margin-right 20px

    img
      cursor pointer

  .person-info
    margin-bottom 10px

    .person-link
      font-weight bold
      font-size 1.2em
      margin-right 20px
</style>
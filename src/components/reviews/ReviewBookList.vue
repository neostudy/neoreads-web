<template>
  <div>
    <el-container class="booklist-container">
      <el-header height="30px">
        <el-row>
          <el-col :span="24">
            <p class="title">
              <faicon :icon="['far', 'bookmark']"></faicon>
              &nbsp;{{ title }}
            </p>
          </el-col>
        </el-row>
      </el-header>
      <el-row v-for="item in booklist" :key="item.id">
        <el-col :span="12">
          <review-book-info v-bind="item[0]"></review-book-info>
        </el-col>
        <el-col :span="12">
          <div v-if="item.length == 2">
            <review-book-info v-bind="item[1]"></review-book-info>
          </div>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>

<script>
function makePair(list) {
  var res = [];
  for (let i = 0; i < list.length; i = i + 2) {
    var pair = [];
    pair[0] = list[i];
    if (i + 1 < list.length) {
      pair[1] = list[i + 1];
    }
    res.push(pair);
  }
  return res;
}

import ReviewBookInfo from "./ReviewBookInfo.vue";

export default {
  components: {
    ReviewBookInfo
  },
  props: {
    title: String,
    id: String
  },
  data() {
    return {
      booklist: []
    };
  },
  created() {
    this.getHotList();
  },

  methods: {
    getHotList() {
      this.$axios.get(`/api/v1/books/hotlist/`).then(res => {
        var data = res.data;
        if (data && data.length > 0) {
          this.booklist = makePair(data);
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-header
  border-bottom 1px solid #eeeeee
  text-align left
.hotlist-container
  height: 400px
  margin-top 10px
  border 1px solid #eee
  border-radius 4px
  padding 10px

  .title
    text-align left
    left 5px
    font-weight bold

    svg
      color #409EFF

div.book-info:hover
  border-radius 5px
  background-color #D9ECFF


</style>

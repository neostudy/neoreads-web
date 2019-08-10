<template>
  <div>
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="16" :offset="4">
            <div>
              <book-list title="温习书单"></book-list>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import BookList from "../reviews/ReviewBookList.vue";
export default {
  components: {
    BookList
  },
  created() {
    this.$store.dispatch("setActiveMenuIndex", "/reviews");
  }
};
</script>


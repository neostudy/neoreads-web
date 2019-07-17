<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="16" :offset="4">
          <div>
            <hot-list title="好书推荐"></hot-list>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import HotList from "../tools/HotList.vue";
export default {
  components: {
    HotList
  },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("setActiveMenuIndex", "/home");
  },
  methods: {}
};
</script>


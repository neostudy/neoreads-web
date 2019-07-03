<template>
  <div class="toc-tree">
    <div class="toc-tree-title">
      <faicon icon="list" class="toc-tree-icon"></faicon>
      <span>章节目录</span>
    </div>
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
    <el-tree
      class="filter-tree"
      :data="data"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
      @node-click="tocSelected"
      ref="tree"
    ></el-tree>
  </div>
</template>

<script>
export default {
  props: ["tocdata"],
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    tocdata(val) {
      // transform toc data into tree data
      this.data = []
      for (let ch of this.tocdata) {
        var node = {}
        node.id = ch.id
        node.label = ch.title
        node.children = []
        this.data.push(node)
      }
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    tocSelected(entry, node, comp) {
      console.log(entry)
      let bookid = this.$route.params.bookid
      let chapid = entry.id
      this.$emit('toc-change', chapid)
      this.$router.push('/reader/'+bookid+'/'+chapid)
    }
  },

  data() {
    return {
      filterText: "",
      data: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  }
};
</script>

<style lang="stylus" scoped>
.toc-tree
  padding 10px
  span
    margin-left 5px

.toc-tree-title
  text-align left
  line-height 32px
  height 32px

  span
    font-weight bold

</style>

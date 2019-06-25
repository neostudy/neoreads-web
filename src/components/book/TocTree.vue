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
      ref="tree"
    ></el-tree>
  </div>
</template>

<script>
export default {
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  },

  data() {
    return {
      filterText: "",
      data: [
        {
          id: 1,
          label: "第一章",
          children: [
            {
              id: 4,
              label: "1.1",
              children: [
                {
                  id: 9,
                  label: "1.2"
                },
                {
                  id: 10,
                  label: "1.3"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "第二章",
          children: [
            {
              id: 5,
              label: "2.1"
            },
            {
              id: 6,
              label: "2.2"
            }
          ]
        },
        {
          id: 3,
          label: "第三章",
          children: [
            {
              id: 7,
              label: "3.1"
            },
            {
              id: 8,
              label: "3.2"
            }
          ]
        }
      ],
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

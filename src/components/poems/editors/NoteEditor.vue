<template>
  <div>
    <mavon-editor :value="value" @input="$emit('input', $event)"></mavon-editor>
    <el-button type="primary" @click="$emit('save')">保存</el-button>
    <el-button @click="$emit('cancel')">取消</el-button>
  </div>
</template>

<script>
export default {
  props: ["value"]
};
</script>
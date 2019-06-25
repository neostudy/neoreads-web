<template>
  <div>
    Interactive
  </div>
</template>

<script>
export default {
  props: {
    dict: Object
  },
  mounted() {
    
  },
  watch: {
    dict: function(oldData, newData) {
      console.log("prop data changed:", newData)
    }
  }
}
</script>

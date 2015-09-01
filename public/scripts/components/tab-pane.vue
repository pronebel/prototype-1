<style lang="scss">
</style>

<template lang="jade">
.tab-pane(v-show="active")
  content
</template>

<script>
  module.exports = {
    props: {
      title: {
        type: String,
        default: ""
      },
      active: false
    },
    created: function() {
      this.$parent.addPane(this);
    },
    destroyed: function() {
      this.$parent.removePane(this);
    }
  }
</script>

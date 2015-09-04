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
      icon: {
        type: String,
        default: ""
      }
    },
    data: function() {
      return {
        active: false
      };
    },
    attached: function() {
      this.$parent.addPane(this);
    },
    detached: function() {
      this.$parent.removePane(this);
    }
  }
</script>

<style type="scss">

</style>

<template>
  <div class="bar-item">
    <p>{{ item.title }}</p>
  </div>
</template>

<script>
  module.exports = {
    props: {
      item: {
        type: Object,
        default: function() {
          return {
            title: ""
          }
        }
      }
    }
  }
</script>

<style>
  .red {
    color: red;
  }
</style>

<template lang="jade">
<h2 class="red">{{ msg }}</h2>
</template>

<script lang="javascript">
  module.exports = {
    data: function() {
      return {
        msg: 'hello from component A'
      }
    }
  };
</script>

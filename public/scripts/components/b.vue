<style>
  .blue {
    color: blue;
  }
</style>

<template lang="jade">
<h2 class="blue">{{ msg }}</h2>
</template>

<script lang="javascript">
  module.exports = {
    data: function() {
      return {
        msg: 'hello from component B'
      };
    }
  };
</script>

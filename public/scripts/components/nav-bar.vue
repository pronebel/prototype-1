<style lang="scss">
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  padding: 0;
  margin: 0;
  border: 0;

  box-shadow: 1px 1px 1px black;

  width: 100%;

  & + div, & + main {
    padding-top: 44px;
  }

  .bar-title {
    flex: 1;

    text-align: center;
  }
}
</style>

<template lang="jade">
.nav-bar
  content
</template>

<script>
  module.exports = {
    data: function() {
      return {
      };
    }
  }
</script>

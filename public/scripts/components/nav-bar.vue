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
  bar-item(item="{{ leftNavItem }}" v-on="click: onItemClick($event)")
  p.bar-title {{ title }}
  bar-item(item="{{ rightNavItem }}" v-on="click: onItemClick($event)")
</template>

<script>
  var barItem = require('./bar-item.vue');

  module.exports = {
    data: function() {
      return {
        leftNavItem: {
          enable: false,
          title: "Left"
        },
        title: "Title",
        rightNavItem: {
          enable: false,
          title: "Right"
        }
      }
    },
    methods: {
      onItemClick($event) {
        console.log($event);
      }
    },
    components: {
      'bar-item': barItem
    }
  }
</script>

<style lang="scss">
body {
  background-color: #DDDDDD;
}

.nav-bar {
  background-color: white;
}

.widget-panel {
  position: fixed;
  left: 0;
  top: 4rem;
  display: block;
  margin: 0;
  padding: 1rem;
  border: none;

  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);
}

.config-panel {
  position: fixed;
  right: 0;
  top: 4rem;
  display: block;
  margin: 0;
  padding: 1rem;
  border: none;

  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);
}

.simulator {
  display: block;
  margin: 0 auto;
  padding: 0;
  border: none;

  box-shadow: 0 0 0.1rem black;

  background-color: white;

  &.iphone-4 {
    width: 320px;
    height: 480px;
  }
}
</style>

<template lang="jade">
nav-bar
main.workspace
  aside.widget-panel
    tab
      tab-pane(title="{{ pane.title }}")
        p content of tab pane
      tab-pane(title="{{ pane2.title }}")
        p content of tab pane 2
  aside.config-panel
  .simulator.iphone-4
</template>

<script lang="javascript">
  module.exports = {
    data: function() {
      return {
        msg: 'hello',
        pane: {
          title: "tab pane"
        },
        pane2: {
          title: "tab pane 2"
        }
      }
    },
    components: {
      navBar: require('../components/nav-bar.vue'),
      tab: require('../components/tab.vue'),
      tabPane: require('../components/tab-pane.vue')
    }
  };
</script>

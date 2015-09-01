<template lang="jade">
nav-bar
tab
  tab-pane(title="{{ pane.title }}")
    p content of tab pane
  tab-pane(title="{{ pane2.title }}")
    p content of tab pane 2
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

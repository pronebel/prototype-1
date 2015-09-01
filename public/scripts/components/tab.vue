<style lang="sass">
.tab {
  display: block;
  padding: 0;
  margin: 0;
  border: 0;

  .tab-items {
    display: flex;
    padding: 0;
    margin: 0;
    border: 0;

    list-style: none;
  }

  .tab-item {
    flex: 1;

    text-align: center;
  }
}
</style>

<template lang="jade">
.tab
  ul.tab-items
    li.tab-item(v-repeat="pane in panes" v-on="click: choosePane(pane)")
      p {{ pane.title }}
  content
</template>

<script>
  var tabPane = require('./tab-pane.vue');

  module.exports = {
    data: function() {
      return {
        panes: []
      }
    },
    methods: {
      addPane: function(pane) {
        this.panes.push(pane);
        if(this.panes.length == 1) {
          pane.active = true;
        }
      },
      removePane: function(pane) {
        var index = this.panes.indexOf(pane);
        if(index !== -1) {
          this.panes.$remove(index);
        }
      },
      choosePane: function(pane) {
        this.panes.forEach(function(_pane) {
          _pane.active = false;
        });

        pane.active = true;
      }
    },
    components: {
      'tab-pane': tabPane
    }
  }
</script>

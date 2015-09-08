<style lang="scss">
body {
  background-color: #DDDDDD;
}

.nav-bar {
  background-color: white;
}

main {
  margin: 2rem;
}

.toolbar {
  padding: 0 1.5rem;

  .tool {
    position: relative;
    display: inline-block;
    padding: 1rem 1.5rem;

    text-align: center;

    cursor: pointer;

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      display: block;
      margin: 0;
      padding: 0;
      border: 1px solid gray;

      width: 100%;

      content: attr(tooltip);

      opacity: 0;

      transition: all 0.625s ease-in-out;

      background-color: white;
    }

    &:hover::after {
      opacity: 1;
      transform: translateY(4rem);
    }
  }
}

.side-bar {
  position: fixed;
  top: 10vh;
  display: block;
  margin: 0;
  padding: 1rem;
  border: none;

  height: 85vh;

  box-shadow: 0 0 1px black;

  background-color: white;

  &.components-panel {
    left: 0;
  }

  &.configure-panel {
    right: 0;
  }

  ul {
    padding: 0;

    list-style: none;
  }

  li {
    display: inline-block;
    padding: 5px;

    width: 50%;

    text-align: center;

    div {
      cursor: pointer;

      padding: 5px;
      border: 1px solid lightgray;
    }
  }
}

.simulator {
  *.drag-enter {
    border: 1px solid blue;
  }

  .tab-content, .tab-pane {
    min-height: 44px;
  }

  .tab-content {
    padding: 5px;
  }

  .tab-pane {
    background-color: lightgray;
  }
}
</style>

<template lang="jade">
nav-bar
  .bar-item
    .toolbar
      .tool(
        v-repeat="tool in tools",
        tooltip="{{ tool.tip }}"
      )
        span(
          v-class="tool.icon"
        )
  p.bar-title(v-text="title")
main.workspace
  aside.side-bar.components-panel
    p
      span(v-class="componentsPane.icon")
      span(v-text="componentsPane.title")
    ul
      li(v-repeat="component in componentsPane.components")
        div(
          draggable="true"
          v-on="dragstart: dragComponent(component, $event)"
        )
          span(v-class="component.icon")
          p(v-text="component.name")

  simulator(
    device="{{ simulator.device }}"
  )

  aside.side-bar.configure-panel
</template>

<script lang="javascript">
  var Vue = require('vue');
  var simulator = require('../components/simulator.vue');
  var navBar = require('../components/nav-bar.vue');
  var barItem = require('../components/bar-item.vue');
  var tab = require('../components/tab.vue');
  var tabPane = require('../components/tab-pane.vue');
  var pagination = require('../components/pagination.vue');

  Vue.component('nav-bar', navBar);
  Vue.component('bar-item', barItem);
  Vue.component('tab', tab);
  Vue.component('tab-pane', tabPane);
  Vue.component('pagination', pagination);

  module.exports = {
    replace: false,
    data: function() {
      return {
        simulator: {
          device: 'iphone-4'
        },
        tools: [
          {
            icon: 'icon-home',
            tip: 'Home'
          },
          {
            icon: 'icon-play2',
            tip: 'Play'
          },
          {
            icon: 'icon-stop',
            tip: 'Stop'
          }
        ],
        componentsPane: {
          icon: 'icon-stack',
          title: 'components',
          components: [
            {
              icon: 'icon-tree',
              name: 'Tab',
              value: 'tab'
            },
            {
              icon: 'icon-insert-template',
              name: 'TabPane',
              value: 'tab-pane'
            },
            {
              icon: 'icon-list',
              name: 'List',
              value: 'list'
            },
            {
              icon: 'icon-table',
              name: 'Grid',
              value: 'grid'
            },
            {
              icon: 'icon-books',
              name: 'Pagination',
              value: 'pagination'
            }
          ]
        }
      }
    },
    methods: {
      dragComponent: function(widget, evt) {
        evt.dataTransfer.effectAllowed = 'copy';
        evt.dataTransfer.setData('Text', widget.value);
      }
    },
    components: {
      simulator: simulator,
      navBar: navBar,
      barItem: barItem,
      tab: tab,
      tabPane: tabPane,
      pagination: pagination
    }
  };
</script>

<style lang='scss'>
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
  display: block;
  margin: 0 auto;
  padding: 19px;
  border: none;

  box-shadow: 0 0 0.1rem black;
  border-radius: 10px;

  background-color: #bbbbbb;

  &.iphone-4 {
    width: 358px;
  }

  .screen {
    height: 480px;

    background-color: white;
  }
}
</style>

<template lang='jade'>
nav-bar
  .bar-item
    .toolbar
      .tool(
        v-repeat='tool in tools',
        tooltip='{{ tool.tip }}'
      )
        span(
          v-class='tool.icon'
        )
  p.bar-title {{ title }}
main.workspace
  aside.side-bar.components-panel
    tab
      tab-pane(
        icon='{{ widgetsPane.icon }}'
        title='{{ widgetsPane.title }}'
      )
        ul
          li(v-repeat="widget in widgetsPane.widgets")
            div(
              draggable="true"
              v-on="dragstart: dragComponent(widget, $event)"
            )
              span(v-class="widget.icon")
              p {{ widget.name }}
      tab-pane(
        icon='{{ containersPane.icon }}'
        title='{{ containersPane.title }}'
      )
        ul
          li(v-repeat="container in widgetsPane.containers")
            div(draggable="true")
              span(v-class="container.icon")
              p {{ container.name }}

  .simulator.iphone-4
    .screen(
      v-on="drop: dropComponent"
    )

  aside.side-bar.configure-panel
</template>

<script lang='javascript'>
  var navBar = require('../components/nav-bar.vue');
  var barItem = require('../components/bar-item.vue');
  var tab = require('../components/tab.vue');
  var tabPane = require('../components/tab-pane.vue');

  module.exports = {
    data: function() {
      return {
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
        widgetsPane: {
          icon: 'icon-book',
          title: 'widgets',
          widgets: [
            {
              icon: 'icon-tree',
              name: 'Tab'
            },
            {
              icon: 'icon-insert-template',
              name: 'TabPane'
            }
          ],
          containers: [
            {
              icon: 'icon-list',
              name: 'List'
            },
            {
              icon: 'icon-table',
              name: 'Grid'
            }
          ]
        },
        containersPane: {
          icon: 'icon-books',
          title: 'containers'
        }
      }
    },
    methods: {
      dragComponent: function(widget, evt) {
        evt.dataTransfer.effectAllowed = 'copy';
        evt.dataTransfer.setData('Text', widget.name);
      },
      dropComponent: function(evt) {
        console.log(evt.dataTransfer.getData('Text'));
      }
    },
    components: {
      navBar: navBar,
      barItem: barItem,
      tab: tab,
      tabPane: tabPane
    }
  };
</script>

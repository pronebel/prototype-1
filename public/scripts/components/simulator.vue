<style lang="scss">
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
    margin: 0;
    padding: 0;
    height: 480px;

    background-color: white;
  }
}
</style>

<template lang="jade">
.simulator(
  v-class="device"
  v-on="click: selectComponent($event), drop: dropComponent($event), dragover: dragOverComponent($event), dragenter: dragEnterComponent($event), dragleave: dragLeaveComponent($event)"
)
  .screen
</template>

<script>

  var findParentVue = function(mountDOM) {
    if(mountDOM.__vue__) {
      return mountDOM.__vue__;
    } else {
      if(mountDOM.parentNode) {
        return findParentVue(mountDOM.parentNode);
      } else {
        return undefined;
      }
    }
  }

  var createTab = function(mountDOM) {
    var Tab = Vue.component('tab');

    var tabDOM = document.createElement('div');
    mountDOM.appendChild(tabDOM);

    var tabVM = new Tab({
      el: tabDOM,
      _parent: findParentVue(mountDOM)
    });

    return tabVM;
  }

  var createTabPane = function(mountDOM) {
    var TabPane = Vue.component('tab-pane');

    var tabPaneDOM = document.createElement('div');
    tabPaneDOM.setAttribute('title', 'Pane');
    mountDOM.appendChild(tabPaneDOM);

    var tabPaneVM = new TabPane({
      el: tabPaneDOM,
      _parent: findParentVue(mountDOM)
    });

    return tabPaneVM;
  }

  var createPagination = function(mountDOM) {
    var Pagination = Vue.component('pagination');

    var paginationDOM = document.createElement('div');
    paginationDOM.setAttribute('total', '{{ pagination.total }}');
    paginationDOM.setAttribute('pager-size', '{{ pagination.pagerSize }}');
    mountDOM.appendChild(paginationDOM);

    var paginationVM = new Pagination({
      el: paginationDOM,
      _parent: findParentVue(mountDOM)
    });

    return paginationVM;
  }

  var defaultComponentFactory = function(componentName, mountDOM) {
    var componentVM;
    switch(componentName) {
      case 'tab':
        componentVM = createTab(mountDOM);
      break;
      case 'tab-pane':
        componentVM = createTabPane(mountDOM);
      break;
      case 'pagination':
        componentVM = createPagination(mountDOM);
      break;
    }

    return componentVM;
  };
  module.exports = {
    props: {
      device: {
        type: String,
        default: 'iphone-5s'
      }
    },
    data: function() {
    },
    methods: function() {
      paginationChange: function(pagination) {
        console.log(pagination);
      },
      selectComponent: function(evt) {
      },
      dragComponent: function(widget, evt) {
      },
      dragOverComponent: function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
      },
      dragEnterComponent: function(evt) {
        evt.target.classList.add('drag-enter');
      },
      dragLeaveComponent: function(evt) {
        evt.target.classList.remove('drag-enter');
      },
      dropComponent: function(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        evt.target.classList.remove('drag-enter');

        defaultComponentFactory(evt.dataTransfer.getData('Text'), evt.target);
      }
    }
  };
</script>

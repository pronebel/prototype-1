var Vue = require('vue');

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

var create = function(componentName, mountDOM) {
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

module.exports.create = create;

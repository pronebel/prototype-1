var express = require('express');
var router = express.Router();

var routes = [
  {
    path: '/',
    view: 'angular',
    app: {
      script: '/scripts/angular.main.js',
      style: '/styles/styles.main.css'
    }
  },
  {
    path: '/angular',
    view: 'angular',
    app: {
      script: '/scripts/angular.main.js',
      style: '/styles/styles.main.css'
    }
  },
  {
    path: '/react',
    view: 'react',
    app: {
      script: '/scripts/React.Main.js',
      style: '/styles/styles.main.css'
    }
  },
  {
    path: '/vue',
    view: 'vue',
    app: {
      script: '/scripts/main.vue.js',
      style: '/styles/styles.main.css'
    }
  }
];

routes.forEach(function(route) {
  router.get(route.path, function(req, res, next) {
    res.render(route.view, {
      title: 'Boilerplate',
      app: route.app
    });
  });
});

module.exports = router;

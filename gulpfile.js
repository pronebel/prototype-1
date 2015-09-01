'use strict';
var url = require('url');
var fs = require('fs');
var path = require('path');
var glob = require('glob');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require('babelify');
var tsify = require('tsify');
var vueify = require('vueify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var config = require('./config');

var inDevMode = function() {
  return config.mode == 'development';
}

var angularTaskFunc = function(entry, taskCfg) {
  return function() {
    var bundler = browserify({
      entries: [entry],
      debug: true,
      cache: {},
      packageCache: {},
      fullPaths: true
    }).plugin('tsify', {
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
      target: 'es5'
    });

    var entryPath = path.parse(entry);

    return bundler.bundle()
                  .pipe(source(entryPath.name + '.js'))
                  .pipe(buffer())
                  .pipe(gulpif(inDevMode(), sourcemaps.init()))
                  .pipe(gulpif(!inDevMode(), uglify()))
                  .pipe(gulpif(inDevMode(), sourcemaps.write()))
                  .pipe(gulp.dest(taskCfg.dstDir));
  };
};

var reactTaskFunc = function(entry, taskCfg) {
  return function() {
    var bundler = browserify({
      entries: [entry],
      transform: [babelify],
      debug: true,
      cache: {},
      packageCache: {},
      fullPaths: true
    });

    var entryPath = path.parse(entry);

    return bundler.bundle()
                  .pipe(source(entryPath.name + '.js'))
                  .pipe(buffer())
                  .pipe(gulpif(inDevMode(), sourcemaps.init()))
                  .pipe(gulpif(!inDevMode(), uglify()))
                  .pipe(gulpif(inDevMode(), sourcemaps.write()))
                  .pipe(gulp.dest(taskCfg.dstDir));
  };
};

var vueTaskFunc = function(entry, taskCfg) {
  return function() {
    var bundler = browserify({
      entries: [entry],
      transform: [vueify],
      debug: true,
      cache: {},
      packageCache: {},
      fullPaths: true
    });

    var entryPath = path.parse(entry);

    return bundler.bundle()
                  .pipe(source(entryPath.name + '.js'))
                  .pipe(buffer())
                  .pipe(gulpif(inDevMode(), sourcemaps.init()))
                  .pipe(gulpif(!inDevMode(), uglify()))
                  .pipe(gulpif(inDevMode(), sourcemaps.write()))
                  .pipe(gulp.dest(taskCfg.dstDir));
  };
};

var sassTaskFunc = function(entry, taskCfg) {
  return function() {
    return gulp.src(entry)
               .pipe(sourcemaps.init())
               .pipe(sass())
               .pipe(autoprefixer())
               .pipe(sourcemaps.write())
               .pipe(rename(function(path) {
                 path.extname = '.css';
               }))
               .pipe(gulp.dest(taskCfg.dstDir));
  };
};

var imagesTaskFunc = function(entry, taskCfg) {
  return function() {
    return gulp.src(entry) 
               .pipe(imagemin({optimizationLevel: 5}))
               .pipe(gulp.dest(taskCfg.dstDir))
  }
}

var tasks = {
  angular: {
    name: 'angular.apps',
    entryPattern: './public/scripts/apps/**/*.ts',
    dstDir: './public/build/scripts',
    dependencies: [
      './public/scripts/**/*.js',
      './public/scripts/**/*.ts'
    ],
    buildFunc: angularTaskFunc
  },
  react: {
    name: 'react.apps',
    entryPattern: './public/scripts/apps/**/*.jsx',
    dstDir: './public/build/scripts',
    dependencies: [
      './public/scripts/**/*.js',
      './public/scripts/**/*.jsx'
    ],
    buildFunc: reactTaskFunc
  },
  vue: {
    name: 'vue.apps',
    entryPattern: './public/scripts/apps/**/*.vue.js',
    dstDir: './public/build/scripts',
    dependencies: [
      './public/scripts/**/*.js',
      './public/scripts/**/*.vue'
    ],
    buildFunc: vueTaskFunc
  },
  sass: {
    name: 'styles.sass',
    entryPattern: './public/styles/apps/**/*.scss',
    dstDir: './public/build/styles',
    dependencies: [
      './public/styles/**/*.scss'
    ],
    buildFunc: sassTaskFunc
  },
  images: {
    name: 'iamges.min',
    entryPattern: './public/images/**/*',
    dstDir: './public/build/images',
    dependencies: [
      './public/images/**/*'
    ],
    buildFunc: imagesTaskFunc
  }
};
var taskNames = Object.keys(tasks);

taskNames.forEach(function (taskName) {
  var taskCfg = tasks[taskName];

  var entries = glob.sync(taskCfg.entryPattern);

  entries.forEach(function(entry) {
    gulp.task(entry, taskCfg.buildFunc(entry, taskCfg));
  });

  taskCfg.entries = entries;

  gulp.task(taskCfg.name, entries);
});

gulp.task('watch', function() {
  taskNames.forEach(function (taskName) {
    var taskCfg = tasks[taskName];

    gulp.watch(taskCfg.dependencies, [taskCfg.name]);
  });
});

gulp.task('serve', ['watch'], function() {
  browserSync.init({
    proxy: url.format(config.server)
  });

  var watchedFiles = [];

  taskNames.forEach(function(taskName) {
    var taskCfg = tasks[taskName];

    var buildFiles = taskCfg.dstDir + '**/*';
    if(watchedFiles.indexOf(buildFiles) === -1) {
      watchedFiles.push(buildFiles);
    }
  });

  gulp.watch(watchedFiles, browserSync.reload);
});

gulp.task('default', taskNames.map(function(taskName) {
  return tasks[taskName].name;
}));

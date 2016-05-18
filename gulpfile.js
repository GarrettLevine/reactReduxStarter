'use strict'

require('babel-register');

var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var notify = require('gulp-notify');

var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var isparta = require('isparta');
var runSequence = require('run-sequence');

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var buffer = require('vinyl-buffer');

var browserSync = require('browser-sync');
var reload = browserSync.reload;
var historyApiFallback = require('connect-history-api-fallback')


/*
  Styles Task
*/

gulp.task('styles',function() {
  // Compiles CSS
  gulp.src('./dev/scss/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(gulp.dest('./public/css/'))
    .pipe(reload({stream:true}))
});

/*
  Images
*/
gulp.task('images',function(){
  gulp.src('./dev/assets/images/**')
    .pipe(gulp.dest('./public/assets/images'))
});

/*
  Browser Sync
*/
gulp.task('browser-sync', function() {
  browserSync.init({
    server: './public'  
  })
});

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(file, watch) {
  var props = {
    entries: ['./dev/js/' + file],
    debug : true,
    cache: {},
    packageCache: {},
    transform:  babelify.configure({
      presets: ["es2015", "react"],
      "plugins": ["transform-object-rest-spread", "transform-object-assign"]
    })
  };

  // watchify() if watch requested, otherwise run browserify() once 
  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  bundler.external('react/addons');
  bundler.external('react/lib/ReactContext');
  bundler.external('react/lib/ExecutionEnvironment');

  function rebundle() {
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulp.dest('./public/js/'))
      // If you also want to uglify it
      // .pipe(buffer())
      // .pipe(uglify())
      // .pipe(rename('app.min.js'))
      // .pipe(gulp.dest('./build'))
      .pipe(reload({stream:true}))
  }

  // listen for an update and run rebundle
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });

  // run it once the first time buildScript is called
  return rebundle();
}

gulp.task('test:react', function() {
  var hasError = false;
  return gulp.src('./dev/js/**/*.test.js')
    .pipe(mocha({
      require: ['./dev/js/test/helpers']
    }))
    .on('error', gutil.log);
});

gulp.task('coverage:instrument', function() {
  return gulp.src('.dev/js/**/*.js')
    .pipe(istanbul({
      instrumenter: isparta.Instrumenter
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task('coverage:report', function() {
  return gulp.src('./dev/js/**/*.js', {read: false})
  .pipe(istanbul.writeReports());
});

gulp.task('scripts', function() {
  return buildScript('index.js', false); // this will run once because we set watch to false
});

gulp.task('test:coverage', function(done) {
  runSequence('coverage:instrument', 'test:react', 'coverage:report', done);
});

gulp.task('test', ['test:react']);

// run 'scripts' task first, then watch for future changes
gulp.task('default', ['images','styles','scripts','browser-sync'], function() {
  gulp.watch('./dev/scss/**/*', ['styles']); // gulp watch for stylus changes
  gulp.watch('./dev/js/**/*', ['scripts']); // gulp watch for stylus changes
  return buildScript('index.js', true); // browserify watch for JS changes
});

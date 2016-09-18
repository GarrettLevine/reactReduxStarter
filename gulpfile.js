//*************************************************
//     I M P O R T S
//*************************************************
'use strict'

require('babel-register');
const gulp = require('gulp');

const source = require('vinyl-source-stream');
const gutil = require('gulp-util');
const browserify = require('browserify');
const babelify = require('babelify');
const watchify = require('watchify');
const notify = require('gulp-notify');
const nodemon = require('gulp-nodemon');

const eslint = require('gulp-eslint');

const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const util = require ('gulp-util');
const buffer = require('vinyl-buffer');

const mocha = require('gulp-mocha');
const runSequence = require('run-sequence');
const istanbul = require('gulp-istanbul');
const isparta = require('isparta');

const browserSync = require('browser-sync');
const reload = browserSync.reload;
const historyApiFallback = require('connect-history-api-fallback')

//*************************************************
//     P A T H S
//*************************************************
const paths = {
  dev: {
    index: './dev/index.html',
    js: './dev/js/**/**/*.jsx',
    scss: './dev/scss/**/*.scss',
    assets: './dev/assets/*',
    server: './server/server.js',
  },
  test: {
    js: './dev/js/**/*.test.js',
  },
  public: {
    js: './public/js/',
    css: './public/css/',
  }
}

//*************************************************
//     S T Y L E S    T A S K
//*************************************************
gulp.task('styles', () => {
  // Compiles CSS
  gulp.src(paths.dev.scss)
    .pipe(sass())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(gulp.dest(paths.public.css))
    .pipe(reload({stream:true}))
});

//*************************************************
//     B R O W S E R   S Y N C
//*************************************************
gulp.task('browser-sync', () => {
  browserSync.init({
    server: './public',
  })
});

function handleErrors() {
  const args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}
//*************************************************
//     E S    L I N T 
//*************************************************
gulp.task('lint', () => {
  return gulp.src([paths.dev.js, '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
//*************************************************
//     J S    B U I L D S C R I P T
//*************************************************

function buildScript(file, watch) {
  const props = {
    entries: ['./dev/js/' + file],
    debug : true,
    cache: {},
    packageCache: {},
    transform: babelify.configure({
      presets: ['es2015', 'react'], 
      plugins: ['transform-object-rest-spread', 'transform-object-assign'],
    }),
  };

  // watchify() if watch requested, otherwise run browserify() once 
  const bundler = watch ? watchify(browserify(props)) : browserify(props);

  bundler.external('react/addons');
  bundler.external('react/lib/ReactContext');
  bundler.external('react/lib/ExecutionEnvironment');

  function rebundle() {
    const stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulp.dest(paths.public.js))
      // If you also want to uglify it
      // .pipe(buffer())
      // .pipe(uglify())
      // .pipe(rename('app.min.js'))
      // .pipe(gulp.dest('./build'))
      .pipe(reload({stream:true}))
  }

  // listen for an update and run rebundle
  bundler.on('update', () => {
    rebundle();
    gutil.log('Rebundle...');
  });

  // run it once the first time buildScript is called
  return rebundle();
}

gulp.task('scripts', () => {
  return buildScript('index.js', false); // this will run once because we set watch to false
});

//*************************************************
//     T E S T / C O V E R A G E   T A S K S
//*************************************************
gulp.task('coverage:instrument', () => { 
  return gulp.src(paths.dev.js)
    .pipe(istanbul({
      instrumenter: isparta.Instrumenter,
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task('test:react', () => {
    const hasError = false;
    return gulp.src(paths.test.js)
      .pipe(mocha({
        require: ['./test/helpers']
      }))
      .on('error', util.log);
});


gulp.task('coverage:report', (done) => {
  console.log('report');
  return gulp.src([paths.dev.js], {read: false})
    .pipe(istanbul.writeReports());
});

/**
 * Run unit tests
 */
gulp.task('test', function(done) {
  return gulp.src(paths.test.js, {read: false})
    .pipe(mocha({
      require: ['./test/helpers.js'] // Prepare environement for React/JSX testing
    }));
});

gulp.task('test:coverage', (done) => {
  runSequence('coverage:instrument', 'test', 'coverage:report', done);
});

// gulp.task('test', ['test:react']);

//*************************************************
//     M I G R A T E   F I L E S
//*************************************************
gulp.task('copy-index-html', () => {
  return gulp.src(paths.dev.index)
    .pipe(gulp.dest('./public/'));
});

gulp.task('copy-assets', () => {
  return gulp.src(paths.dev.assets)
    .pipe(gulp.dest('./public/assets'));
});

//*************************************************
//     N O D E   S E R V E R
//*************************************************
gulp.task('nodemon', () => {
  nodemon({
    script: paths.dev.server,
    ext: 'js html',
    env: { 'NODE_ENV': 'development' },
  });
});

//*************************************************
//     G U L P   W A T C H
//*************************************************
gulp.task('default',
  ['styles','scripts','browser-sync', 'copy-assets', 'copy-index-html', 'nodemon'], () => {
  gulp.watch(paths.dev.scss, ['styles']); // gulp watch for stylus changes
  gulp.watch(paths.dev.js, ['scripts']); // gulp watch for JS changes
  return buildScript('index.js', true); // browserify watch for JS changes
});

gulp.task('build', ['styles', 'scripts']);

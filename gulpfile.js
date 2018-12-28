/*
* gulpfile.js
*/

const BUILD_FILENAME = 'main_app.js'

const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sourcemaps = require('gulp-sourcemaps');
const stripDebug = require('gulp-strip-debug');
const rename = require("gulp-rename");
const replace = require('gulp-replace');

gulp.task('default', ['build']);

gulp.task("test", function () {
});

gulp.task('build', ['blockly_copy'], function() {
  gulp.src(['./src/**/*.js'])
    .pipe(sourcemaps.init())  // ソースマップを初期化
    .pipe(concat(BUILD_FILENAME))
    // .pipe(uglify())
    .pipe(sourcemaps.write()) // ソースマップの作成
    .pipe(gulp.dest('./_build'));
});

gulp.task("watch", function() {  
  var targets = ['./src/**/*.js'];
  gulp.watch(targets, ['build']);
});

//Blocklyのjsを"_bundle"へコピー
gulp.task("blockly_copy", function () {
  return gulp.src([
    'blockly/blockly_compressed.js',
    'blockly/blocks_compressed.js',
    'blockly/javascript_compressed.js',
    'blockly/msg/js/ja.js',
  ], { base: 'blockly' })
    .pipe(gulp.dest('_bundle'));
});



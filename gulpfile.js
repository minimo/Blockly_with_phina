/*
* gulpfile.js
*/

const BUILD_FILENAME = 'jfk.js'

const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sourcemaps = require('gulp-sourcemaps');
const stripDebug = require('gulp-strip-debug');
const rename = require("gulp-rename");
const replace = require('gulp-replace');

gulp.task('default', ['build']);

gulp.task('build', function() {
  gulp.src(['./src/**/*.js'])
    .pipe(sourcemaps.init())  // ソースマップを初期化
    .pipe(concat(BUILD_FILENAME))
    // .pipe(uglify())
    .pipe(sourcemaps.write()) // ソースマップの作成
    .pipe(gulp.dest('./_build'));
});

gulp.task('release', function() {
  gulp.src(['./src/**/*.js'])
    .pipe(sourcemaps.init())  // ソースマップを初期化
    .pipe(concat(BUILD_FILENAME))
    .pipe(uglify())
    .pipe(sourcemaps.write()) // ソースマップの作成
    .pipe(gulp.dest('./_build'));
});

gulp.task("watch", function() {  
  var targets = [
    './src/**/*.js',
  ];
  gulp.watch(targets, ['build']);
});

//難読化
gulp.task("uglify", function() {
  return gulp.src('./_build/' + BUILD_FILENAME)
    .pipe(stripDebug())
    .pipe(uglify({ mangle: false }))
    .pipe(rename({
      extname: ".min.js"
    }))
    .pipe(gulp.dest("./_build"));
});

//index.htmlがjfk.min.jsを読み込む様に変更
gulp.task('release', ['uglify'], function () {
  return gulp
    .src(['./_build/index.html'])
    .pipe(replace('<script src="jfk.js"></script>', '<script src="jfk.min.js"></script>'))
    .pipe(gulp.dest('./_build/'))
});

//index.htmlがjfk.jsを読み込む様に変更
gulp.task('develop', function () {
  return gulp
    .src(['./_build/index.html'])
    .pipe(replace('<script src="jfk.min.js"></script>', '<script src="jfk.js"></script>'))
    .pipe(gulp.dest('./_build/'))
});

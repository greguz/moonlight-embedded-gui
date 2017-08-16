const gulp = require('gulp')
const webpack = (file) => require('webpack-stream')(require(file), require('webpack'))
const eslint = require('gulp-eslint')

gulp.task('bundle-static', function () {
  return gulp
    .src('app/index.html')
    .pipe(gulp.dest('out'))
})

gulp.task('bundle-main', function () {
  return gulp
    .src('main.js')
    .pipe(webpack('./webpack.main'))
    .pipe(gulp.dest('.'))
})

gulp.task('bundle-rendered', function () {
  return gulp
    .src('rendered.js')
    .pipe(webpack('./webpack.rendered'))
    .pipe(gulp.dest('.'))
})

gulp.task('bundle', [
  'bundle-static',
  'bundle-main',
  'bundle-rendered'
])

gulp.task('lint', function () {
  return gulp
    .src([
      '**/*.js',
      '!node_modules/**',
      '!out/**'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

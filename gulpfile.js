var browserify = require('browserify')
var gulp = require('gulp')
var rename = require('gulp-rename')
var source = require('vinyl-source-stream')
var tap = require('gulp-tap')

// 共通の JS モジュール
var commonModules = ['js-cookie', 'underscore']

var commonJs = function() {
  var bundler = browserify('src/assets/javascripts/common.js')
  commonModules.forEach(function(lib) {
    bundler.require(lib)
  })
  return bundler
    .bundle()
    .pipe(source('common.bundle.js'))
    .pipe(gulp.dest('htdocs/assets/javascripts'))
}

var pageJs = function() {
  return gulp
    .src('src/assets/javascripts/pages/*.js', { read: false })
    .pipe(
      tap(function(file) {
        var bundler = browserify(file.path)
        commonModules.forEach(function(lib) {
          bundler.exclude(lib)
        })
        file.contents = bundler.bundle()
      })
    )
    .pipe(
      rename(function(path) {
        path.extname = '.bundle.js'
      })
    )
    .pipe(gulp.dest('htdocs/assets/javascripts/pages'))
}

var jsTasks = gulp.parallel(commonJs, pageJs)

gulp.task('build', gulp.series(jsTasks))

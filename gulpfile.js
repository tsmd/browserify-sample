var browserify = require('browserify')
var gulp = require('gulp')
var merge = require('merge-stream')
var rename = require('gulp-rename')
var source = require('vinyl-source-stream')
var tap = require('gulp-tap')

// 共通の JS モジュール
var commonModules = [
  'js-cookie',
  'underscore',
  { file: './src/assets/javascripts/common/string-utils', expose: 'string-utils' }
]

var js = function() {
  var commonBundler
  commonBundler = browserify('src/assets/javascripts/common.js')
  commonBundler.require(commonModules)
  var commonStream = commonBundler
    .bundle()
    .pipe(source('common.bundle.js'))
    .pipe(gulp.dest('htdocs/assets/javascripts'))

  var pageStream = gulp
    .src('src/assets/javascripts/pages/*.js', { read: false })
    .pipe(
      tap(function(file) {
        var bundler = browserify(file.path)
        bundler.external(commonBundler)
        file.contents = bundler.bundle()
      })
    )
    .pipe(
      rename(function(path) {
        path.extname = '.bundle.js'
      })
    )
    .pipe(gulp.dest('htdocs/assets/javascripts/pages'))
  return merge(commonStream, pageStream)
}

gulp.task('build', gulp.series(js))

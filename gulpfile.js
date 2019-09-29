const browserify = require('browserify')
const gulp = require('gulp')
const gutil = require('gulp-util')
const rename = require('gulp-rename')
const source = require('vinyl-source-stream')
const tap = require('gulp-tap')

// 共通の JS モジュール
const commonModules = ['js-cookie', 'underscore']

const commonJs = () => {
  const bundler = browserify('src/assets/javascripts/common.js')
  commonModules.forEach(lib => {
    bundler.require(lib)
  })
  return bundler
    .bundle()
    .on('error', err => gutil.log('Browserify Error', err))
    .pipe(source('common.bundle.js'))
    .pipe(gulp.dest('htdocs/assets/javascripts'))
}

const pageJs = () => {
  return gulp
    .src('src/assets/javascripts/pages/*.js', { read: false })
    .pipe(
      tap(file => {
        const bundler = browserify(file.path)
        commonModules.forEach(lib => {
          bundler.exclude(lib)
        })
        file.contents = bundler.bundle()
      })
    )
    .pipe(
      rename(path => {
        path.extname = '.bundle.js'
      })
    )
    .pipe(gulp.dest('htdocs/assets/javascripts/pages'))
}

const jsTasks = gulp.parallel(commonJs, pageJs)

gulp.task('build', gulp.series(jsTasks))

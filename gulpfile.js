var browserify = require('browserify')
var gulp = require('gulp')
var merge = require('merge-stream')
var rename = require('gulp-rename')
var source = require('vinyl-source-stream')
var tap = require('gulp-tap')

var js = function() {
  var commonBundler = browserify('src/assets/javascripts/common.js')

  // 共通の JS モジュール
  // すべての画面で共通して読み込ませる JS ファイルをここに記述する。
  // jQuery, Underscore.js, 各種ユーティリティ関数や、
  // ヘッダー、フッター等の全画面共通の UI が必要とするスクリプト等が想定される
  commonBundler.require([
    // NPM パッケージは、パッケージ名を書く。
    // npm install --save-dev でインストールすることを忘れない。
    'js-cookie',
    'underscore',
    // ローカルのファイルは、gulpfile.js からの相対パスを記述する。
    // expose プロパティで指定した名前で、require できるようになる。
    { file: './src/assets/javascripts/common/string-utils', expose: 'string-utils' }
  ])

  // 全画面共通で読み込む JS ファイル (common.bundle.js) を生成する
  var commonStream = commonBundler
    .bundle()
    .pipe(source('common.bundle.js'))
    .pipe(gulp.dest('htdocs/assets/javascripts'))

  // ページ固有の処理を行う JS ファイル ([page].bundle.js) を生成する
  // 以下の書き方は Gulp 公式のレシピから拝借
  // https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-multiple-destination.md
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

  // ２つの browserify タスクをまとめる
  return merge(commonStream, pageStream)
}

gulp.task('build', gulp.series(js))

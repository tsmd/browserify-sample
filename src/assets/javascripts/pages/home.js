var _ = require('underscore')

const $body = $('body')
$body.append('<p>home.js!</p>')

if (_) {
  $body.append('<p>Underscore.js is loaded!</p>')
}

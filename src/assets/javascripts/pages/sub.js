var Cookies = require('js-cookie')

var $body = $('body')
$body.append('<p>sub.js!</p>')

if (Cookies) {
  $body.append('<p>js-cookie is loaded!</p>')
}

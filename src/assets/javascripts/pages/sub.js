'use strict'

var Cookies = require('js-cookie')
var utils = require('string-utils')

var $body = $('body')
$body.append('<p>sub.js!</p>')

if (Cookies) {
  $body.append('<p>js-cookie is loaded!</p>')
}

$body.append('<p>' + utils.randomString(100) + '</p>')

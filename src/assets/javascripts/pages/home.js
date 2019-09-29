'use strict'

var _ = require('underscore')
var utils = require('string-utils')

var $body = $('body')
$body.append('<p>home.js!</p>')

if (_) {
  $body.append('<p>Underscore.js is loaded!</p>')
}

$body.append('<p>' + utils.randomString(100) + '</p>')

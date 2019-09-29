(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict'

var Cookies = require('js-cookie')
var utils = require('string-utils')

var $body = $('body')
$body.append('<p>sub.js!</p>')

if (Cookies) {
  $body.append('<p>js-cookie is loaded!</p>')
}

$body.append('<p>' + utils.randomString(100) + '</p>')

},{"js-cookie":"js-cookie","string-utils":"string-utils"}]},{},[1]);

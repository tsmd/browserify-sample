'use strict'

var createHeaderSearch = require('./libs/header-search')
$('.HeaderSearch').each(function () {
  createHeaderSearch(this)
})

$('body').append('<p>common.js!</p>')

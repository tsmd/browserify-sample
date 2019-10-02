'use strict'

var headerSearch = require('./libs/header-search')
$('.HeaderSearch').each(function () {
  headerSearch.create(this)
})

$('body').append('<p>common.js!</p>')

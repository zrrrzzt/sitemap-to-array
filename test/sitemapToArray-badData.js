'use strict'

var tap = require('tap')
var sitemapToArray = require('../index')

tap.test('It requires valid data.', function (test) {
  var sitemap = '<xml'
  var expectedErrorMessage = 'Error: Unexpected end\nLine: 0\nColumn: 4\nChar: '
  sitemapToArray(sitemap, function (error, result) {
    tap.equal(error.toString(), expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

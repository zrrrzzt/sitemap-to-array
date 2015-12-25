'use strict'

var tap = require('tap')
var sitemapToArray = require('../index')

tap.test('It requires a parameter: sitemap', function (test) {
  var sitemap = false
  var expectedErrorMessage = 'Missing required input: sitemap.'
  var options = {
    returnOnComplete: true
  }
  sitemapToArray(sitemap, options, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

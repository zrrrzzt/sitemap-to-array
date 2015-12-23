'use strict'

var tap = require('tap')
var sitemapToArray = require('../index')

tap.test('It returns expected result from url.', function (test) {
  var sitemap = 'https://raw.githubusercontent.com/zrrrzzt/sitemap-to-array/master/test/data/sitemap.xml'
  var expectedResult = require('./data/sitemap.json').toString()
  sitemapToArray(sitemap, function (error, result) {
    if (error) {
      throw error
    }
    tap.equal(result.toString(), expectedResult)
    test.done()
  })
})

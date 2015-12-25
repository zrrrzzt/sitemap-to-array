'use strict'

var fs = require('fs')
var tap = require('tap')
var sitemapToArray = require('../index')

tap.test('It returns expected result from data.', function (test) {
  var sitemap = fs.readFileSync('test/data/sitemap.xml', 'utf-8')
  var expectedResult = require('./data/sitemap.json').toString()
  var options = {
    returnOnComplete: true
  }
  sitemapToArray(sitemap, options, function (error, result) {
    if (error) {
      throw error
    }
    tap.equal(result.toString(), expectedResult)
    test.done()
  })
})

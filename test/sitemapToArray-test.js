'use strict'

var fs = require('fs')
var tap = require('tap')
var sitemapToArray = require('../index')

tap.test('It requires a parameter: sitemap', function (test) {
  var sitemap = false
  var expectedErrorMessage = 'Missing required input: sitemap.'
  sitemapToArray(sitemap, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('It requires valid data.', function (test) {
  var sitemap = '<xml'
  var expectedErrorMessage = 'Error: Unexpected end\nLine: 0\nColumn: 4\nChar: '
  sitemapToArray(sitemap, function (error, result) {
    tap.equal(error.toString(), expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('Returns error on bad url', function (test) {
  var sitemap = 'https://gummiballenssyltelabberifinnesikkeher.no'
  sitemapToArray(sitemap, function (error, data) {
    tap.ok(error, 'Url does not exist')
    test.done()
  })
})

tap.test('It returns expected result from data.', function (test) {
  var sitemap = fs.readFileSync('test/data/sitemap.xml', 'utf-8')
  var expectedResult = require('./data/sitemap.json').toString()
  sitemapToArray(sitemap, function (error, result) {
    if (error) {
      throw error
    }
    tap.equal(result.toString(), expectedResult)
    test.done()
  })
})

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

'use strict'

var fs = require('fs')
var tap = require('tap')
var sitemapToArray = require('../index')

tap.test('It requires an options object.', function (test) {
  var options = false
  var expectedErrorMessage = 'Missing required input: options.'
  sitemapToArray(options, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('It requires options.data or options.url.', function (test) {
  var options = {}
  var expectedErrorMessage = 'Missing required input: options.data or options.url.'
  sitemapToArray(options, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('It requires options.url to be valid.', function (test) {
  var options = {url: 'pysje'}
  var expectedErrorMessage = 'Invalid url: options.url.'
  sitemapToArray(options, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('It requires valid data.', function (test) {
  var data = '<xml'
  var options = {data: data}
  var expectedErrorMessage = 'Unclosed root tag\nLine: 0\nColumn: 4\nChar: '
  sitemapToArray(options, function (error, result) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('Returns error on bad url', function (test) {
  var url = 'https://gummiballenssyltelabberifinnesikkeher.no'
  var options = {url: url}
  sitemapToArray(options, function (error, data) {
    tap.ok(error, 'Url does not exist')
    test.done()
  })
})

tap.test('It returns expected result from data.', function (test) {
  var data = fs.readFileSync('test/data/sitemap.xml', 'utf-8')
  var options = {data: data}
  var expectedResult = require('./data/sitemap.json').toString()
  sitemapToArray(options, function (error, result) {
    if (error) {
      throw error
    }
    tap.equal(result.toString(), expectedResult)
    test.done()
  })
})

tap.test('It returns expected result from url.', function (test) {
  var url = 'https://raw.githubusercontent.com/zrrrzzt/sitemap-to-array/master/test/data/sitemap.xml'
  var options = {url: url}
  var expectedResult = require('./data/sitemap.json').toString()
  sitemapToArray(options, function (error, result) {
    if (error) {
      throw error
    }
    tap.equal(result.toString(), expectedResult)
    test.done()
  })
})

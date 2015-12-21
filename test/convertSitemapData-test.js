'use strict'

var fs = require('fs')
var tap = require('tap')
var convertSitemapData = require('../lib/convertSitemapData')

tap.test('It requires data.', function (test) {
  var data = false
  var expectedErrorMessage = 'Missing required input: data'
  convertSitemapData(data, function (error, result) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('It requires valid data.', function (test) {
  var data = '<xml'
  var expectedErrorMessage = 'Error: Unexpected end\nLine: 0\nColumn: 4\nChar: '
  convertSitemapData(data, function (error, result) {
    tap.equal(error.toString(), expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('It returns expected result for sitemap.', function (test) {
  var data = fs.readFileSync('test/data/sitemap.xml', 'utf-8')
  var expectedResult = require('./data/sitemap.json').toString()
  convertSitemapData(data, function (error, result) {
    if (error) {
      throw error
    }
    tap.equal(result.toString(), expectedResult, 'Sitemap OK')
    test.done()
  })
})

tap.test('It returns expected result for sitemapindex.', function (test) {
  var data = fs.readFileSync('test/data/sitemapindex.xml', 'utf-8')
  var expectedResult = require('./data/sitemapindex.json').toString()
  convertSitemapData(data, function (error, result) {
    if (error) {
      throw error
    }
    tap.equal(result.toString(), expectedResult, 'Sitemapindex OK')
    test.done()
  })
})

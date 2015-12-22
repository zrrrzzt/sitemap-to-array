'use strict'

var fs = require('fs')
var tap = require('tap')
var streamifier = require('streamifier')
var convertSitemapData = require('../lib/convertSitemapData')

tap.test('It requires valid data.', function (test) {
  var data = streamifier.createReadStream('<xml')
  var expectedErrorMessage = 'Error: Unexpected end\nLine: 0\nColumn: 4\nChar: '

  convertSitemapData.on('error', function (error) {
    tap.equal(error.toString(), expectedErrorMessage, expectedErrorMessage)
    test.done()
  })

  data
    .pipe(convertSitemapData)
})

tap.test('It returns expected result for sitemap.', function (test) {
  var data = fs.createReadStream('test/data/sitemap.xml')
  var expectedResult = require('./data/sitemap.json').toString()
  var result = []
  convertSitemapData.on('data', function (data) {
    result.push(JSON.parse(data.toString()))
  })
  convertSitemapData.on('end', function () {
    tap.equal(result.toString(), expectedResult, 'Sitemap OK')
    test.done()
  })
  convertSitemapData.on('error', function (error) {
    throw error
  })
  data
    .pipe(convertSitemapData)
})

tap.test('It returns expected result for sitemapindex.', function (test) {
  var data = fs.createReadStream('test/data/sitemapindex.xml')
  var expectedResult = require('./data/sitemapindex.json').toString()
  var result = []
  convertSitemapData.on('data', function (data) {
    result.push(JSON.parse(data.toString()))
  })
  convertSitemapData.on('end', function () {
    tap.equal(result.toString(), expectedResult, 'Sitemapindex OK')
    test.done()
  })
  convertSitemapData.on('error', function (error) {
    throw error
  })
  data
    .pipe(convertSitemapData)
})

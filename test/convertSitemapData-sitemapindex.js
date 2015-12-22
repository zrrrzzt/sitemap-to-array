'use strict'

var fs = require('fs')
var tap = require('tap')
var convertSitemapData = require('../lib/convertSitemapData')

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

'use strict'

var fs = require('fs')
var tap = require('tap')
var getSitemap = require('../lib/get-sitemap')

tap.test('It requires an url.', function (test) {
  var url = false
  var expectedErrorMessage = 'Missing required input: url.'
  getSitemap(url, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('It requires url to be valid.', function (test) {
  var url = 'pysje'
  var expectedErrorMessage = 'Invalid url.'
  getSitemap(url, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('Returns error on bad url', function (test) {
  var url = 'https://gummiballenssyltelabberifinnesikkeher.no'
  getSitemap(url, function (error, data) {
    tap.ok(error, 'Url does not exist')
    test.done()
  })
})

tap.test('Returns expected data', function (test) {
  var url = 'https://raw.githubusercontent.com/zrrrzzt/sitemap-to-array/master/test/data/sitemap.xml'
  var expectedData = fs.readFileSync('test/data/sitemap.xml', 'utf-8')
  getSitemap(url, function (error, data) {
    if (error) {
      throw error
    }
    tap.equal(data, expectedData)
    test.done()
  })
})

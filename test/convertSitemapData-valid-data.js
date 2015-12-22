'use strict'

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

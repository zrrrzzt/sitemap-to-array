'use strict'

var validUrl = require('valid-url')
var hh = require('http-https')
var streamifier = require('streamifier')
var streamify = require('streamify')
var convertStream = require('./lib/convertSitemapData')

function sitemapToArray (sitemap, callback) {
  if (!sitemap) {
    return callback(new Error('Missing required input: sitemap.'), null)
  }

  var list = []
  var stream = false
  var err = null

  if (validUrl.isWebUri(sitemap)) {
    stream = streamify()
    hh.get(sitemap, function (response) {
      stream.resolve(response)
    })
  } else {
    stream = streamifier.createReadStream(sitemap)
  }

  convertStream.on('data', function (data) {
    list.push(JSON.parse(data))
  })

  convertStream.on('end', function () {
    return callback(err, list)
  })

  convertStream.on('error', function (error) {
    err = error
  })

  stream
    .pipe(convertStream)
}

module.exports = sitemapToArray

module.exports.stream = convertStream

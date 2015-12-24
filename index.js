'use strict'

var validUrl = require('valid-url')
var hh = require('http-https')
var streamifier = require('streamifier')
var streamify = require('streamify')
var convertStream = require('./lib/convertSitemapData')

function sitemapToArray (sitemap, options, callback) {
  if (!sitemap) {
    return callback(new Error('Missing required input: sitemap.'), null)
  }

  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  var returnOnComplete = options.returnOnComplete || false
  var list = returnOnComplete ? [] : require('stream').PassThrough()
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
    list.push(returnOnComplete ? JSON.parse(data.toString()) : data)
  })

  convertStream.on('end', function () {
    if (returnOnComplete) {
      return callback(err, list)
    } else {
      list.push(null)
    }
  })

  convertStream.on('error', function (error) {
    err = error
    if (!returnOnComplete) {
      list.emit('error', error)
    }
  })

  stream
    .pipe(convertStream)

  if (!returnOnComplete) {
    return callback(list)
  }
}

module.exports = sitemapToArray

module.exports.stream = convertStream
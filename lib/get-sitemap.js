'use strict'

var get = require('http-https')
var validUrl = require('valid-url')
var body = ''

function getSitemap (url, callback) {

  if (!url) {
    return callback(new Error('Missing required input: url.'))
  }

  if (url && !validUrl.isWebUri(url)) {
    return callback(new Error('Invalid url.'), null)
  }

  var req = get.request(url, function (res) {
    res.on('data', function (chunk) {
      body += chunk.toString()
    })

    res.on('end', function () {
      return callback(null, body)
    })

  })

  req.on('error', function (error) {
    return callback(error, null)
  })

  req.end()
}

module.exports = getSitemap

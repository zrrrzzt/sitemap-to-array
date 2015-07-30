'use strict'

var validUrl = require('valid-url')
var getSitemap = require('./lib/get-sitemap')
var convertData = require('./lib/convert-data')

function sitemapToArray (options, callback) {

  if (!options) {
    return callback(new Error('Missing required input: options.'), null)
  }

  if (!options.data && !options.url) {
    return callback(new Error('Missing required input: options.data or options.url.'), null)
  }

  if (options.url && !validUrl.isWebUri(options.url)) {
    return callback(new Error('Invalid url: options.url.'), null)
  }

  function handleConversion (error, data) {
    if (error) {
      return callback(error, null)
    } else {
      return callback(null, data)
    }
  }

  if (options.url) {
    getSitemap(options.url, function (error, data) {
      if (error) {
        return callback(error, null)
      } else {
        convertData(data, handleConversion)
      }
    })
  }

  if (options.data) {
    convertData(options.data, handleConversion)
  }
}

module.exports = sitemapToArray

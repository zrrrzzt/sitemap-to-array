'use strict'

var validUrl = require('valid-url')
var getSitemap = require('./lib/get-sitemap')
var convertSitemapData = require('./lib/convertSitemapData')

function sitemapToArray (sitemap, callback) {
  if (!sitemap) {
    return callback(new Error('Missing required input: sitemap.'), null)
  }

  function handleConversion (error, data) {
    if (error) {
      return callback(error, null)
    } else {
      return callback(null, data)
    }
  }

  if (validUrl.isWebUri(sitemap)) {
    getSitemap(sitemap, function (error, data) {
      if (error) {
        return callback(error, null)
      } else {
        convertSitemapData(data, handleConversion)
      }
    })
  } else {
    convertSitemapData(sitemap, handleConversion)
  }
}

module.exports = sitemapToArray

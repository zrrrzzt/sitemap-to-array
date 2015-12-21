'use strict'

function convertSitemapData (data, callback) {
  if (!data) {
    return callback(new Error('Missing required input: data'), null)
  }
  var saxStream = require('sax').createStream(true, {trim: true})
  var streamifier = require('streamifier')
  var objectFromArray = require('./objectFromArray')
  var stream = streamifier.createReadStream(data)
  var outList = []
  var list = []
  var err = null

  saxStream.on('opentag', function (node) {
    if (node.name !== 'urlset' && node.name !== 'sitemapindex') {
      if (node.name === 'url' && list.length > 0 || node.name === 'sitemap' && list.length > 0) {
        outList.push(objectFromArray(list))
        list = []
      } else {
        if (node.name !== 'url' && node.name !== 'sitemap') {
          list.push(node.name)
        }
      }
    }
  })

  saxStream.on('text', function (text) {
    if (list.length > 0) {
      list.push(text)
    }
  })

  saxStream.on('end', function (node) {
    outList.push(objectFromArray(list))
    return callback(err, outList)
  })

  saxStream.on('error', function (error) {
    err = error
  })

  stream
    .pipe(saxStream)
}

module.exports = convertSitemapData

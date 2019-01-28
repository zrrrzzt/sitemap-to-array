'use strict'

const duplexify = require('duplexify')
const saxStream = require('sax').createStream(true, { trim: true })
const readStream = require('stream').PassThrough()
const objectFromArray = require('./objectFromArray')
let list = []

saxStream.on('opentag', function (node) {
  if (node.name !== 'urlset' && node.name !== 'sitemapindex') {
    if ((node.name === 'url' && list.length > 0) || (node.name === 'sitemap' && list.length > 0)) {
      readStream.push(JSON.stringify(objectFromArray(list)))
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
  readStream.push(JSON.stringify(objectFromArray(list)))
  readStream.push(null)
})

saxStream.on('error', function (error) {
  readStream.emit('error', error)
})

module.exports = duplexify(saxStream, readStream)

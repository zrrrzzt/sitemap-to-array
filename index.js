'use strict'

const validUrl = require('valid-url')
const hh = require('http-https')
const streamifier = require('streamifier')
const streamify = require('streamify')
const convertStream = require('./lib/convertSitemapData')

function sitemapToArray (sitemap, options, callback) {
  if (!sitemap) {
    return callback(new Error('Missing required input: sitemap.'), null)
  }

  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  const returnOnComplete = options.returnOnComplete || false
  const list = returnOnComplete ? [] : require('stream').PassThrough()
  let stream = false
  let err = null

  if (validUrl.isWebUri(sitemap)) {
    stream = streamify()
    hh.get(sitemap, response => {
      stream.resolve(response)
    })
  } else {
    stream = streamifier.createReadStream(sitemap)
  }

  convertStream.on('data', data => {
    list.push(returnOnComplete ? JSON.parse(data.toString()) : data)
  })

  convertStream.on('end', () => {
    if (returnOnComplete) {
      return callback(err, list)
    } else {
      list.push(null)
    }
  })

  convertStream.on('error', error => {
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

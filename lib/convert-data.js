'use strict'

var xml2js = require('xml2js')
var parser = new xml2js.Parser()

/**
 * unWrapItem
 *
 *@desc unwraps arrays to value
 *
 * @param {object} item - The object from
 * @returns {object} newItem - The unwrapped item
 */
function unWrapItem (item) {
  var newItem = {}

  Object.keys(item).forEach(function (prop) {
    newItem[prop] = item[prop][0]
  })

  return newItem
}

/**
 * convertData
 *
 * @desc converts sitemap.xml to an array of objects
 *
 * @param {string} data - The sitemap xmldata as string
 * @param {callback} callback - The callback for handling the response
 * @returns {object}
 */
function convertData (data, callback) {
  if (!data) {
    return callback(new Error('Missing required input: data.'), null)
  }

  var output = []

  parser.parseString(data, function (error, result) {
    if (error) {
      return callback(error, null)
    } else {
      if (result.urlset) {
        output = result.urlset.url.map(unWrapItem)
      }
      if (result.sitemapindex) {
        output = result.sitemapindex.sitemap.map(unWrapItem)
      }
      return callback(null, output)
    }
  })

}

module.exports = convertData

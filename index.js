'use strict';

var validUrl = require('valid-url');
var convertData = require('./lib/convert-data');

function sitemapToArray(options, callback) {
  if (!options) {
    return callback(new Error('Missing required input: options.'), null);
  }

  if (!options.data && !options.url) {
    return callback(new Error('Missing required input: options.data or options.url.'), null);
  }

  if (options.url && !validUrl.isWebUri(options.url)) {
    return callback(new Error('Invalid url: options.url.'), null);
  }

  if (options.data) {
    convertData(options.data, function(error, data){
      if (error) {
        return callback(error, null);
      } else {
        return callback(null, data);
      }
    });
  }
}

module.exports = sitemapToArray;
'use strict';

var tap = require('tap');
var sitemapToArray = require('../index');


tap.test('It requires an options object.', function(test) {
  var options = false;
  var expectedErrorMessage = 'Missing required input: options.';
  sitemapToArray(options, function (error, data){
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage);
    test.done();
  });
});

tap.test('It requires options.data or options.url.', function(test) {
  var options = {};
  var expectedErrorMessage = 'Missing required input: options.data or options.url.';
  sitemapToArray(options, function (error, data){
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage);
    test.done();
  });
});

tap.test('It requires options.url to be valid.', function(test) {
  var options = {url:'pysje'};
  var expectedErrorMessage = 'Invalid url: options.url.';
  sitemapToArray(options, function (error, data){
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage);
    test.done();
  });
});
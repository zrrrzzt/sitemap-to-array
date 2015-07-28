'use strict';

var fs = require('fs');
var tap = require('tap');
var convertData = require('../lib/convert-data');

tap.test('It requires data.', function(test) {
  var data = false;
  var expectedErrorMessage = 'Missing required input: data.';
  convertData(data, function (error, result){
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage);
    test.done();
  });
});

tap.test('It requires valid data.', function(test) {
  var data = '<xml';
  var expectedErrorMessage = 'Unclosed root tag\nLine: 0\nColumn: 4\nChar: ';
  convertData(data, function (error, result){
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage);
    test.done();
  });
});

tap.test('It returns expected result.', function(test) {
  var data = fs.readFileSync('test/data/sitemap.xml', 'utf-8');
  var expectedResult = require('./data/sitemap.json').toString();
  convertData(data, function (error, result) {
    tap.equal(result.toString(), expectedResult);
    test.done();
  });
});
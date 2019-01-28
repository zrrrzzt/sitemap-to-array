'use strict'

var tap = require('tap')
var objectFromArray = require('../lib/objectFromArray')
var testObject = require('./data/testObject.json')
var testArray = require('./data/testArray.json')
var converted = objectFromArray(testArray)

tap.equal(
  converted.loc, testObject.loc,
  'It returns expected object fra an array'
)

tap.throws(
  function () {
    objectFromArray()
  },
  { message: 'No input. Input must be an array' },
  'Throws if no input'
)

tap.throws(
  function () {
    objectFromArray('123')
  },
  { message: 'Input must be an array' },
  'Throws if input is not an array'
)

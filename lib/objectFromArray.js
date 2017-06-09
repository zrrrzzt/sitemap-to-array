'use strict'

module.exports = arr => {
  if (!arr) {
    throw new Error('No input. Input must be an array')
  }
  if (!Array.isArray(arr)) {
    throw new Error('Input must be an array')
  }
  var obj = {}
  while (arr.length > 0) {
    obj[arr.shift()] = arr.shift()
  }
  return obj
}

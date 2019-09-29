'use strict'

/**
 * 指定の長さのランダム文字列を得る
 * @param {number} length
 * @returns {string}
 */
function randomString(length) {
  var result = ''
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

module.exports.randomString = randomString

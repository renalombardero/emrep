'use strict'

const inquirer = require('inquirer')
const clear    = require('clear')

const questions = require('../questions')
const msg       = require('../messages')

function _html (items) {
  console.log("run")
  return new Promise((resolve, reject) => {
    clear()
    if (true) {
      resolve({type: "err", res: msg.notAllFiles})
    } else {
      reject({type: "err", res: msg.notAllFiles})
    }
  })
}

module.exports = {
  html : _html
}
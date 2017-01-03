'use strict'

const inquirer = require('inquirer')
const clear    = require('clear')

const questions = require('../questions')
const msg       = require('../messages')

function _html (items) {
  console.log("run")
  return new Promise((resolve, reject) => {
    clear()
    if (items.csv && items.html) {
      resolve({type: "success", text: msg.htmlExported.replace('%n', '3').replace('%f', 'EXPORT')})
    } else {
      resolve({type: "warn", text: msg.notAllFiles})
    }
  })
}

module.exports = {
  html : _html
}
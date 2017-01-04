'use strict'

const inquirer = require('inquirer')
const clear    = require('clear')
const fs       = require('fs')
const parse    = require('csv-parse/lib/sync')
const Spinner  = require('cli-spinner').Spinner

const questions = require('../questions').processor
const msg       = require('../messages')

function _html (items) {
  var targetDir = "EXPORT"
  var emailCount = 5
  var CSVstring
  var HTMLbase
  var records
  var header
  var processedEmails = {}
  var spinner = new Spinner(msg.spinner)
  var prompt = inquirer.createPromptModule()

  var fields = {
    group : -1,
    from  : -1,
    to    : -1
  }

  spinner.setSpinnerString('|/-\\')

  return new Promise((resolve, reject) => {
    if (items.csv && items.html) {
      spinner.start()
      CSVstring = fs.readFileSync(items.csv)
      HTMLbase = fs.readFileSync(items.html)
      records = parse(CSVstring, {delimiter: ";"})
      header = records[0]

      for (var i = 0; i < header.length; i++) {
        questions.group[0].choices.push({name: header[i], value: i})
        questions.from[0].choices.push({name: header[i], value: i})
        questions.to[0].choices.push({name: header[i], value: i})
      }

      // console.log(JSON.stringify(questions))
      spinner.stop(true)

      clear()

      prompt(questions.group).then((answers) => {
        fields.group = answers.group
        questions.from[0].choices.splice(fields.group, 1)

        prompt(questions.from).then((answers) => {
          fields.from = answers.from
          questions.to[0].choices.splice(fields.group, 1)
          questions.to[0].choices.splice(fields.from, 1)

          prompt(questions.to).then((answers) => {
            fields.to = answers.to

            spinner.start()

            for (i = 1; i < records.length; i++) {
              processedEmails[records[i][fields.group]] = HTMLbase.toString()
            }

            console.log(processedEmails)


            process.exit()
            resolve({type: "success", text: msg.htmlExported.replace('%n', emailCount).replace('%f', targetDir)})
          })
        })
      })

    } else {
      resolve({type: "warn", text: msg.notAllFiles})
    }
  })
}

module.exports = {
  html : _html
}
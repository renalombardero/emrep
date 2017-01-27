'use strict'

const inquirer   = require('inquirer')
const clear      = require('clear')
const fs         = require('fs')
const dateformat = require('dateformat')
const parse      = require('csv-parse/lib/sync')
const detect     = require('detect-csv')
const replaceall = require('replaceall')
const Spinner    = require('cli-spinner').Spinner

const questions = require('../questions').processor
const msg       = require('../messages')

function _html (items) {
  var emailCount = 0
  var targetDir
  var CSVstring
  var CSVproperties
  var HTMLbase
  var records
  var header
  var processedEmails = {}
  var spinner = new Spinner(msg.spinner)
  var prompt = inquirer.createPromptModule()
  var now = dateformat(new Date(), "yyyymmdd")

  var fields = {
    group : -1,
    from  : -1,
    to    : -1,
    dir   : ""
  }

  spinner.setSpinnerString('|/-\\')

  return new Promise((resolve, reject) => {
    if (items.csv && items.html) {
      spinner.start()
      CSVstring = fs.readFileSync(items.csv)
      CSVproperties = detect(CSVstring)
      HTMLbase = fs.readFileSync(items.html)

      if (!CSVproperties) {
        spinner.stop(true)
        resolve({type: "warn", text: msg.notCSVFile})
      }

      records = parse(CSVstring, {delimiter: CSVproperties.delimiter})
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

            for (i = 1; i < records.length; i++) {
              if (records[i][fields.from]) {
                processedEmails[records[i][fields.group]] = replaceall(records[i][fields.from],records[i][fields.to],processedEmails[records[i][fields.group]])
              }
            }

            targetDir = "./" + now + "_" + items.html

            if (!fs.existsSync(targetDir)){
              fs.mkdirSync(targetDir);
            }

            for (var k in processedEmails) {
              fs.writeFileSync(targetDir + "/" + now + "_" + k + "_" + items.html, processedEmails[k])
              emailCount++
            }

            spinner.stop(true)

            questions.group[0].choices = []
            questions.from[0].choices = []
            questions.to[0].choices = []

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
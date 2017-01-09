#! /usr/bin/env node
'use strict'

const inquirer = require('inquirer')
const clear    = require('clear')
const boxen    = require('boxen')
const asciify  = require('asciify')
const chalk    = require('chalk')
const fs       = require('fs')
const path     = require('path')
const updateNotifier = require('update-notifier')

const pkg       = require('./package.json')
const questions = require('./questions')
const msg       = require('./messages')
const exporter  = require('./exporter')

var items = {
  csv  : "",
  html : ""
}
var notify = updateNotifier({
    pkg,
    updateCheckInterval: 1000 * 60 * 60 * 24 // 1 dia
});


asciify('EmRep', {font:'Lean',color:'green'}, (err,res) => {
  clear()

  if (notify.update !== undefined) {
    showUpdateMsg(notify.update)
  }

  console.log(res)
  init()
})

var prompt = inquirer.createPromptModule()

function init() {
  mainMenu(true)
}

function mainMenu(noClear) {
  if (!noClear) {
    clear()
  }

  prompt(questions.main).then((answers) => {
    switch (answers.mainMenu) {
      case 'loadCSV' :
        loadFile("csv")
        break
      case 'loadHTML' :
        loadFile("html")
        break
      case 'export' :
        exporter.html(items).then(exportHTML)
        break
      case 'exit' :
        quitEmRep()
        break
    }
  });
}

function loadFile(ext) {
  var i
  var q

  if (ext == "csv") {
    q = questions.csv
  } else if (ext == "html") {
    q = questions.html
  }

  fs.readdir('.', (err, files) => {
    if (files.length) {
      for (i in files) {
        if (path.extname(files[i]) == '.' + ext && fs.lstatSync(files[i]).isFile()) {
          q[0].choices.push({name:files[i]})
        }
      }
      if (q[0].choices.length) {
        q[0].choices.push(new inquirer.Separator())
        q[0].choices.push({name: '<- Voltar',value:'back'})
        prompt(q).then((answers) => {
          if (answers.chooseFile != 'exit') {
            items[ext] = answers.chooseFile
            q[0].choices = []
            console.log(chalk.green(msg[ext + "Loaded"].replace('%r', items[ext])))

            mainMenu(true)
          } else {
            q[0].choices = []
            mainMenu()
          }
        })
      } else {
        console.log(chalk.bgRed(msg.noFile))
        mainMenu(true)
      }
    } else {
      console.log(chalk.bgRed(msg.noFile))
      mainMenu(true)
    }
  })

  clear()
}

function exportHTML(res) {
  clear()
  if (res.type == "warn") {
    console.log(chalk.yellow(res.text))
  } else if (res.type == "success") {
    console.log(chalk.green(res.text))
  }
  mainMenu(true)
}

function quitEmRep() {
  clear()
}

function showUpdateMsg(notification) {
  if (notification.latest != notification.current)
  {
    var returnMessage = ""

    returnMessage = chalk.green(msg.update.title) + "\n\n"
    returnMessage = returnMessage + msg.update.current + chalk.red(notification.current) + "\n"
    returnMessage = returnMessage + msg.update.latest + chalk.green(notification.latest) + "\n\n"
    returnMessage = returnMessage + msg.update.howto + "\n"
    returnMessage = returnMessage + chalk.bgBlue(msg.update.cmd)

    console.log(boxen(returnMessage, {
      padding: 1,
      margin: 1,
      borderColor: 'green',
      borderStyle: 'classic'
    }))
  }

}

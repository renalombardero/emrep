#! /usr/bin/env node
'use strict'

const inquirer = require('inquirer')
const clear    = require('clear')
const asciify  = require('asciify')
const chalk    = require('chalk')
const fs       = require('fs')
const path     = require('path')

const questions = require('./questions')
const msg       = require('./messages')

var items = {
  csv  : "",
  html : ""
}


asciify('EmRep', {font:'Lean',color:'cyan'}, (err,res) => {
  clear()
  console.log(res)
  init()
})

var prompt = inquirer.createPromptModule()

function init() {
  mainMenu(true)
}

function mainMenu(init) {
  if (!init) {
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
        exportHTML()
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
        if (path.extname(files[i]) == '.' + ext) {
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

function exportHTML() {
  console.log('Export')
}

function quitEmRep() {
  clear()
  console.log(items)
  console.log('End')
}

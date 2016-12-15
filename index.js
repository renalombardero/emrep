#! /usr/bin/env node
'use strict'

const inquirer = require('inquirer')
const clear    = require('clear')
const asciify  = require('asciify')
const chalk    = require('chalk')
const fs       = require('fs')
const path     = require('path')

const questions = require('./questions')

clear()

asciify('EmRep', {font:'Lean',color:'cyan'}, (err,res) => {
  // console.log(res)
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
        loadCSV()
        break
      case 'loadHTML' :
        loadHTML()
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

function loadCSV() {
  var i
  var csvQ = questions.csv

  clear()

  fs.readdir('.', (err, files) => {
    if (files.length) {
      for (i in files) {
        if (path.extname(files[i]) == '.csv') {
          csvQ[0].choices.push({name:files[i]})
        }
      }
      if (csvQ[0].choices.length) {
        csvQ[0].choices.push(new inquirer.Separator())
        csvQ[0].choices.push({name: '<- Voltar',value:'back'})
        prompt(csvQ).then((answers) => {
          if (answers.chooseCSV != 'back') {
            console.log(answers.chooseCSV)
          }
          csvQ[0].choices = []
          mainMenu()
        })
      } else {
        console.log(chalk.bgRed(' Nenhum arquivo encontrado '))
        mainMenu()
      }
    } else {
      console.log(chalk.bgRed(' Nenhum arquivo encontrado '))
      mainMenu()
    }
  })
}

function loadHTML() {
  console.log('HTML')
}

function exportHTML() {
  console.log('Export')
}

function quitEmRep() {
  clear()
  console.log('End')
}

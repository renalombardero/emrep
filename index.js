#! /usr/bin/env node
'use strict'

const inquirer = require('inquirer')
const clear    = require('clear')
const asciify  = require('asciify')
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
  prompt(questions.main).then((answers) => {
    // console.log(answers.mainMenu);

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
  console.log('CSV')
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

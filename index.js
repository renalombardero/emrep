#! /usr/bin/env node
'use strict'

const inquirer = require('inquirer')
const asciify = require('asciify')

asciify('Teste', {font:'Lean',color:'cyan'}, (err,res) => { console.log(res) })

var prompt = inquirer.createPromptModule()

var questions = {}

questions.main = [
  {
    type: 'list',
    message: '++ MENU ++',
    name: 'mainMenu',
    choices: [
      {
        name: 'Ler CSV'
      },
      {
        name: 'Exportar HTMLs'
      },
      new inquirer.Separator(),
      {
        name: 'Sair'
      }
    ]
  }
]

// init()

function init() {
  prompt(questions.main).then(function (answers) {
    console.log(JSON.stringify(answers, null, '  '));
  });
}

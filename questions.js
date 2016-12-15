'use strict'

const inquirer = require('inquirer')

var questions = {
  main : [
    {
      type: 'list',
      message: '++ MENU ++',
      name: 'mainMenu',
      choices: [
        {
          name: 'Carregar CSV',
          value: 'loadCSV'
        },
        {
          name: 'Carregar HTML',
          value: 'loadHTML'
        },
        {
          name: 'Exportar HTMLs',
          value: 'export'
        },
        new inquirer.Separator(),
        {
          name: 'Sair',
          value: 'exit'
        }
      ]
    }
  ],
  csv : [
    {
      type: 'list',
      message: '== Escolha um arquivo CSV ==',
      name: 'chooseCSV',
      choices: []
    }
  ]
}

module.exports = questions
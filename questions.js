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
  ]
}

module.exports = questions
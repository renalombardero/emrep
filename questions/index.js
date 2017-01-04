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
      name: 'chooseFile',
      choices: []
    }
  ],
  html : [
    {
      type: 'list',
      message: '== Escolha um arquivo HTML ==',
      name: 'chooseFile',
      choices: []
    }
  ],
  processor : {
    group : [
      {
        type: 'list',
        message: '== Qual o campo do VEÍCULO? ==',
        name: 'group',
        choices: []
      }
    ],
    from : [
      {
        type: 'list',
        message: '== Qual o campo que será ALTERADO? ==',
        name: 'from',
        choices: []
      }
    ],
    to : [
      {
        type: 'list',
        message: '== Qual o campo do novo VALOR? ==',
        name: 'to',
        choices: []
      }
    ],
    dir : [
      {
        type: 'list',
        message: '== Qual a pasta onde serão salvos os HTMLs exportados? ==',
        name: 'dir',
        choices: []
      }
    ]
  }
}

module.exports = questions
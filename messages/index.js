'use strict'

var messages = {
  spinner      : "Processando... %s",
  noFile       : " Nenhum arquivo encontrado ",
  csvLoaded    : "Base '%r' carregada",
  htmlLoaded   : "News '%r' carregado",
  notAllFiles  : "Para continuar precisa escolher os arquivos CSV e HTML",
  notCSVFile   : "Arquivo CSV fora do padrão, favor tentar com outro",
  htmlExported : "%n arquvo(s) exportados na pasta '%f'",
  update       : {
    title      : "EXISTE UMA NOVA VERSÃO",
    howto      : "Para atualizar, digite na linha de comando:",
    cmd        : "            npm update -g emrep            ",
    latest     : "Última versão ⇒ ",
    current    : "Versão atual  ⇒ "
  }
}

module.exports = messages
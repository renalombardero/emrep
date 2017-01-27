# EmRep
##### CLI para replace em email
___

[![NPM](https://nodei.co/npm/emrep.png?compact=true)](https://nodei.co/npm/emrep/)

### Requisitos
- Node.js

#### Versões de Node.js testadas
- v7.2.1

### Instalação
Executar o comando:

```
npm install -g emrep
```

Após isso fica disponível o comando **emrep** para uso no terminal.

### Como usar?

Na pasta onde será executado o comando devemos ter, pelo menos, um arquivo **csv** e um **html**.

No **csv** precisamos de pelo menos 3 colúnas contendo os seguintes dados:

- **VEÍCULO**
   Esse campo deve ter o nome do veículo para o qual será exportado o HTML. Precisa ser utilizado mesmo quando só exista um único veículo.
- **VALOR QUE SERÁ ALTERADO ( DE )**
   Este campo contem o valor *placeholder* utilizado no **html**
- **NOVO VALOR ( PARA )**
   Este campo contem o valor que será salvo no novo **html**

**_DETALHE:_** Existem três arquivos **csv** e dois **html** de exemplo na pasta **_example_**.

Tendo esses arquivos, executar o comando no terminal e seguir os passos.

```
emrep
```

1. Escolher o arquivo **csv**
2. Escolher o arquivo **html**
3. Exportar o pacote com novos arquivos **html**

Os novos arquivos serão exportados em uma nova pasta com a seguinte nomenclatura:

```
./YYYYMMDD_nomedoarquivo.html
```

Ex.:
```
./20170105_email.html
```

Cada email será exportado com a seguinte nomenclatura:

```
./YYYYMMDD_nomedoarquivo.html/YYYYMMDD_veiculo_nomedoarquivo.html
```

Ex.:
```
./20170105_email.html/20170105_agencia_email.html
```

Podem ser exportados mais de um email por sessão.

### TODO

- Testar em outras versões de Node.js
- Alterar arquivo de mensagens e perguntas para facilitar localização.
- Localizar e documentar em inglês.
- Incluír possibilidade de usar a linha de comando, sem UI.
- Estudar possibilidade de fazer replace de caminho de imagens para quando os arquivos forem publicados e precisar incluir o caminho absoluto.
- Fazer verificação com RegEx para limitar replace a links
- Fazer verificação e substituir caso existam caracteres especiais (Ex. á é í ó ú)
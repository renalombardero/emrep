# EmRep
##### CLI para replace em email
___

### Instalação
Clonar o repositório e rodar o comando:

```
npm link
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

O arquivo também tem que estar separado por *ponto e virgula (;)* e não só por virgula (i). O Excel já exporta o arquivo desse jeito.

**_DETALHE:_** Existem dois arquivos **csv** e dois **html** de exemplo na pasta **_example_**.

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
./20170105_email.html/20170105_isobar_email.html
```

Podem ser exportados mais de um email por sessão.

### TODO

- Testar em outras versões de Node.js (só foi testado na **v7.2.1**)
- Estudar possibilidade de fazer replace de caminho de imagens para quando os arquivos forem publicados e precisar incluir o caminho absoluto.
- Fazer verificação com RegEx para limitar replace a links
- Fazer verificação e substituir caso existam caracteres especiais (Ex. á é í ó ú)
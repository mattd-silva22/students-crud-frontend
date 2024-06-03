### Índice

- [Descrição](#descricao)
- [Setup](#setup)

### Descrição

Sistema de gestão construída em Next.js que permite a criação, atualização , edição e exclusão de cadastros

#### Tecnologias utilizadas:

- Next.Js
- React
- Typescript
- Docker

### Setup:

Siga os passos abaixo para executar a aplicação.

#### Ambiente homologação (Docker)

No ambiente de homologação vamos utilizar o Docker para rodar os container da aplicação

Dentro da pasta raiz do repositório execute os seguintes comandos Docker:

```bash
  docker build -t students-frontend .
  docker run -p 3000:3000 --name students-frontend students-frontend
```

O serviço ira ficar disponibilizado na localhost:3000.

#### Ambiente Dev

Execute os seguintes comando para instalar as dependências e iniciar o servidor de teste:

```bash

npm install
npm run start:dev

```

O serviço ira ficar disponibilizado na localhost:3000.

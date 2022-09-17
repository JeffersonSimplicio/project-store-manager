<h1 align="center">STORE MANAGER 🛒</h1>

## Descrição
Store Manager é um API Rest desenvolvida com uma arquitetura em camadas MSC (Model-Service-Controller), desenvolvida por TDD(Test-driven development). Essa aplicação faz o gerenciamento de vendas do formado drop shipping, conseguindo criar, ler, editar e excluir um produto ou uma venda(CRUD). A aplicação foi desenvolvida em agosto de 2022, durante o Módulo de Back-End da [Trybe](https://www.betrybe.com/).

### Esquema das tabelas
![image](./images/der.png)

## Tecnologias

![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)
![Chai](https://img.shields.io/badge/chai-A30701?style=for-the-badge&logo=chai&logoColor=white)
![Sinon](https://img.shields.io/badge/sinon.js-323330?style=for-the-badge&logo=sinon)

O projeto foi desenvolvido em uma arquitetura em camadas **MSC** (Model-Service-Controller), a interação com o banco de dados **MySQL** foi feita de maneira direta através de querys. Sendo construída com o framework **Express** para estruturar endpoints e tratar erros. Usando os princípios dos **REST** para garantir qualidade e padrão do código, além de padronizar o formato que os dados seriam recebidos e retornados.

O framework **Mocha** foi utilizado para estruturar os testes, as asserções utilizadas foram providas pela biblioteca **Chai**. Por tratar-se de testes unitários, apenas uma funcionalidade específica era testada por vez, para que as demais funções não influenciassem nos teste, a biblioteca **Sinon** foi usada para criar dubles.

## Desenvolvimento
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Insomnia](https://img.shields.io/badge/Insomnia-black?style=for-the-badge&logo=insomnia&logoColor=5849BE)

Para assegurar um ambiente isolado e seguro para o desenvolvimento e dos testes, foi usado o **Docker**. Os códigos foram escritas na ferramenta da Microsoft, **Visual Studio Code**. Durante a criação o Nodemon foi utilizado para rodar a execução, essa ferramenta tornou o desenvolvimento mais dinâmico, o monitoramento do comportamento da API foi feito com o **Insomnia**.

Nesse projeto também foi feita a criação de testes unitários, com cobertura de 100% das linhas¹. Os testes foram feitos para Models, Servirces e Controllers, senso implementado com o uso de Mocha, Chai e Sinon. Os testes possuem dubles, portanto, podem ser executados mesmo sem um banco de dados(`npm run test:mocha`).

¹ - Relativo aos arquivos testados.

## Utilização

<details>
  <summary><strong>💻 Localmente</strong></summary>

- Para rodar a aplicação, obrigatoriamente você deve ter o `node` instalado em seu computador.
  
- É necessário ter o MySQL sendo executado
  
- ✨ **Dica:**  Caso não possua o banco de dados criado ainda, user o comando `npm run migration`²

- ✨ **Dica:** Para povoar o banco de dados, execute o comando `npm run seed`²

1. Clone o projeto e entre no diretório

```
cd project-store-manager
git clone git@github.com:JeffersonSimplicio/project-store-manager.git
```

2. Instale as dependências
```
npm i
```
3. Renomeie o arquivo `.env.example` para `.env` e edite os dados para os da sua maquina

4. Inicie a aplicação
```
npm start
```
</details>

<details>
  <summary><strong>🐳 Docker</strong></summary>

- Para rodar a aplicação com docker, sera necessário ter instalando em suas maquina `Docker` e `Docker Compose`

- ✨ **Dica:** Caso não possua o banco de dados criado ainda, user o comando `npm run migration`²

- ✨ **Dica:** Para povoar o banco de dados, execute o comando `npm run seed`²

² - execute esses comandos no terminal do container

1. Clone o projeto e entre no diretório

```
cd project-store-manager
git clone git@github.com:JeffersonSimplicio/project-store-manager.git
```
2. Suba o ambiente do docker
```
docker-compose up -d
```

3. Acesse o terminal do contêiner
```
docker exec -it store_manager bash
```

4. Instale as dependências
```
npm i
```

5. Inicialize a aplicação
```
npm start
```
</details>
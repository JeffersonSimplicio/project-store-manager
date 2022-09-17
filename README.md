<h1 align="center">STORE MANAGER 🛒</h1>

## Descrição
Store Manager é um API Rest desenvolvida com uma arquitetura em camadas MSC (Model-Service-Controller), desenvolvida através de TDD(Test-driven development). Esse aplicação faz o gerenciamento de vendas do formado drop shipping, sendo capaz de criar, ler, editar e excluir um produto ou uma venda(CRUD). A aplicação foi desenvolvida em agosto de 2022, durante o Modulo de Back-End da [Trybe](https://www.betrybe.com/).

### Esquema das tabelas
![image](./images/der.png)

## Tecnologias!

![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)
![Chai](https://img.shields.io/badge/chai-A30701?style=for-the-badge&logo=chai&logoColor=white)
![Sinon](https://img.shields.io/badge/sinon.js-323330?style=for-the-badge&logo=sinon)

O projeto foi desenvolvido em uma arquitetura em camadas **MSC** (Model-Service-Controller), a interação com o banco de dados **MySQL** foi feita de maneira direta através de querys. Sendo construída com o framework **Express** para estruturar endpoints e tratar erros. Usando os princípios dos **REST** para garantir qualidade e padrão do código, além de padronizar o formato que os dados seriam recebidos e retornados.

O framework **Mocha** foi utilizado para estruturar os testes, as asserções utilizadas foram providas pela biblioteca **Chai**. Por tratar-se de testes unitários, apenas uma funcionalidade especifica era testada por vez, para que as demais funções não influenciassem nos teste, a biblioteca **Sinon** foi usada para criar dubles.

<!-- Olá, Tryber!

# 🚧 README em construção 🚧

Esse é apenas um arquivo inicial para o README do seu projeto.

É essencial que você preencha esse documento por conta própria, ok?

Não deixe de usar nossas dicas de escrita de README de projetos, e deixe sua criatividade brilhar!

⚠️ IMPORTANTE: você precisa deixar nítido:
- quais arquivos/pastas foram desenvolvidos por você; 
- quais arquivos/pastas foram desenvolvidos por outra pessoa estudante;
- quais arquivos/pastas foram desenvolvidos pela Trybe.

-->

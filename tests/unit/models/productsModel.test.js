const { expect } = require("chai");
const { describe } = require("mocha");
const Sinon = require("sinon");

const productsModel = require("../../../models/productsModel");
const connection = require("../../../models/connection");

describe("Testando productsModel; ", () => {
  describe("Testando getAll de produtos: ", () => {
    afterEach(() => {
      Sinon.restore();
    });
    it("é retornado um array", async () => {
      const resultExecute = [
        {
          id: 1,
          name: "Martelo de Thor",
        },
        {
          id: 2,
          name: "Traje de encolhimento",
        },
        {
          id: 3,
          name: "Escudo do Capitão América",
        },
      ];
      Sinon.stub(connection, "execute").resolves([resultExecute]);

      const result = await productsModel.getAll();

      expect(result).to.be.an("array");
    });
    it("a função retorna um array com todos os produtos", async () => {
      const resultExecute = [
        {
          id: 1,
          name: "Martelo de Thor",
        },
        {
          id: 2,
          name: "Traje de encolhimento",
        },
        {
          id: 3,
          name: "Escudo do Capitão América",
        },
      ];
      Sinon.stub(connection, "execute").resolves([resultExecute]);

      const result = await productsModel.getAll();

      expect(result).to.be.deep.equal(resultExecute);
    });
  });

  describe("Testando getById de produtos: ", () => {
    afterEach(() => {
      Sinon.restore();
    });
    it("retorna um array vazio quando id não existe", async () => {
      const resultExecute = [];
      Sinon.stub(connection, "execute").resolves([resultExecute]);

      const result = await productsModel.getById();

      expect(result).to.be.empty;
    });
    it("retorna apenas um produto", async () => {
      const resultExecute = [
        {
          id: 1,
          name: "Martelo de Thor",
        },
      ];
      Sinon.stub(connection, "execute").resolves([resultExecute]);

      const result = await productsModel.getById();

      expect(result).to.have.lengthOf(1);
    });
    it("retorna o produto com id certo", async () => {
      const resultExecute = [
        {
          id: 1,
          name: "Martelo de Thor",
        },
      ];
      Sinon.stub(connection, "execute").resolves([resultExecute]);

      const result = await productsModel.getById();
      
      expect(result[0]).to.be.deep.equal({ id: 1, name: "Martelo de Thor" });
    });
  });

  describe("Testando addProduct: ", () => {
    afterEach(() => {
      Sinon.restore();
    });
    it('retorna o produto adicionado com o id ', async () => {
      const resultExecute = { insertId: 4 };
      Sinon.stub(connection, "execute").resolves([resultExecute]);

      const result = await productsModel.addProduct("productX");

      expect(result).to.be.deep.equal({ id: 4, name: "productX" });
    });
  });
  describe("Testando update de produtos: ", () => {
    afterEach(() => {
      Sinon.restore();
    });
    it("a função 'execute' é chamada duas vezes",async () => {
      Sinon.stub(connection, "execute")
        .onCall(0).resolves()
        .onCall(1).resolves([{ id: 1, name: "Martelo de Thor" }]);
      
      await productsModel.update(1, "Martelo de Thor");
      expect(connection.execute.calledTwice).to.be.true;
    });
    it("retorna um objeto com id e o nome atualizado", async () => {
            Sinon.stub(connection, "execute")
        .onCall(0).resolves()
        .onCall(1).resolves([[ { id: 1, name: 'Martelo de Batman' } ]]);
      
      const result = await productsModel.update(1, "Martelo de Batman");
      expect(result).to.be.deep.equal({ id: 1, name: "Martelo de Batman" });
    });
  });
});

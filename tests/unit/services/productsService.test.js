const { expect } = require("chai");
const { describe } = require("mocha");
const Sinon = require("sinon");

const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

describe("Testando productsService; ", () => {
  describe("Testando getAll de produtos: ", () => {
    afterEach(() => {
      Sinon.restore();
    });
    it("é retornado um array", async () => {
      const resultGetAll = [];
      Sinon.stub(productsModel, "getAll").resolves(resultGetAll);

      const result = await productsService.getAll();

      expect(result).to.be.an("array");
    });
    it('retorna todos os produtos do banco de dados',async () => {
      const resultGetAll = [
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
      Sinon.stub(productsModel, "getAll").resolves(resultGetAll);

      const result = await productsService.getAll();

      expect(result).to.be.deep.equal(resultGetAll);
    })
  });
  describe("Testando getById de produtos: ", () => {
    afterEach(() => {
      Sinon.restore();
    });
    it('retorna um objeto "{ message: "Product not found" }", ao receber um array vazio', async () => {
      const resultGetById = [];
      Sinon.stub(productsModel, "getById").resolves(resultGetById);

      const result = await productsService.getById();

      expect(result).to.be.an("object");
      expect(result).to.be.deep.equal({ message: "Product not found" });
    });
    it('retorna o objeto de produto', async () => {
      const resultGetById = [
        {
          id: 1,
          name: "Martelo de Thor",
        },
      ];
      Sinon.stub(productsModel, "getById").resolves(resultGetById);

      const result = await productsService.getById();

      expect(result).to.be.an("object");
      expect(result).to.be.deep.equal({ id: 1, name: "Martelo de Thor" });
    });
  });
  describe("Testando addProduct: ", () => {
    afterEach(() => {
      Sinon.restore();
    });
    it('retorna o novo produto com "id" e "name"', async () => {
      const resultAddProduct = { id: 4, name: "productX" };
      Sinon.stub(productsModel, "addProduct").resolves(resultAddProduct);

      const result = await productsService.addProduct("productX");

      expect(result).to.be.an("object");
      expect(result).to.be.deep.equal(resultAddProduct);
    });
  });
  describe("Testando update: ", () => {
    afterEach(() => {
      Sinon.restore();
    });
    it("retorna mensagem de erro caro o id não exista", async () => {
      const resultGetById = []; //{ id: 1, name: 'Martelo de Thor' }
      Sinon.stub(productsModel, "getById").resolves(resultGetById);

      const result = await productsService.update(15, "productX");

      expect(result).to.be.an("object");
      expect(result).to.be.deep.equal({ message: "Product not found" });
    });
    it("retorna um objeto com id e o novo nome do produto", async () => {
      const resultGetById = [{ id: 1, name: "Martelo de Thor" }];
      Sinon.stub(productsModel, "getById").resolves(resultGetById);

      const resultUpdate = { id: 1, name: "productX" };
      Sinon.stub(productsModel, "update").resolves(resultUpdate);

      const result = await productsService.update(1, "productX");

      expect(result).to.be.an("object");
      expect(result).to.be.deep.equal(resultUpdate);
    });
  });
});

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
      const resultExecute = [];
      Sinon.stub(productsModel, "getAll").resolves(resultExecute);

      const result = await productsService.getAll();

      expect(result).to.be.an("array");
    });
    it('retorna todos os produtos do banco de dados',async () => {
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
      Sinon.stub(productsModel, "getAll").resolves(resultExecute);

      const result = await productsService.getAll();

      expect(result).to.be.deep.equal(resultExecute);
    })
  });
  describe("Testando getById de produtos: ", () => {
    afterEach(() => {
      Sinon.restore();
    });
    it('retorna um objeto "{ message: "Product not found" }", ao receber um array vazio', async () => {
      const resultExecute = [];
      Sinon.stub(productsModel, "getById").resolves(resultExecute);

      const result = await productsService.getById();

      expect(result).to.be.an("object");
      expect(result).to.be.deep.equal({ message: "Product not found" });
    });
    it('retorna o objeto de produto', async () => {
      const resultExecute = [
        {
          id: 1,
          name: "Martelo de Thor",
        },
      ];
      Sinon.stub(productsModel, "getById").resolves(resultExecute);

      const result = await productsService.getById();

      expect(result).to.be.an("object");
      expect(result).to.be.deep.equal({ id: 1, name: "Martelo de Thor" });
    });
  });
  describe("Testando addProduct de produtos: ", () => {
    afterEach(() => {
      Sinon.restore();
    });
    it('retorna o novo produto com "id" e "name"', async () => {
      const resultExecute = { id: 4, name: "productX" };
      Sinon.stub(productsModel, "addProduct").resolves(resultExecute);

      const result = await productsService.addProduct("productX");

      expect(result).to.be.an("object");
      expect(result).to.be.deep.equal(resultExecute);
    });
  });
});

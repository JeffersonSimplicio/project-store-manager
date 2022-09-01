const { expect } = require("chai");
const { describe } = require("mocha");
const Sinon = require("sinon");

const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

const FULL_LIST = [
  { id: 1, name: "Martelo de Thor" },
  { id: 2, name: "Traje de encolhimento" },
  { id: 3, name: "Escudo do Capitão América" },
];

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
      const resultGetAll = FULL_LIST;
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
        { id: 1, name: "Martelo de Thor" },
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
  describe("Testando remover:", () => {
    afterEach(() => {
      Sinon.restore();
    });
    it("a função productsModel.remove deve ser chamada apenas se o id existir",
      async () => {
        const resultGetById = [];
        Sinon.stub(productsModel, "getById").resolves(resultGetById);

        Sinon.stub(productsModel, "remove").resolves();

        await productsService.remove(15);

        expect(productsModel.remove.notCalled).to.be.true;
    });
    it("cado o id passado não exista, retornar uma mensagem de erro", async () => {
      const resultGetById = [];
      Sinon.stub(productsModel, "getById").resolves(resultGetById);

      const result = await productsService.remove(15);

      expect(result).to.be.an("object");
      expect(result).to.be.deep.equal({ message: "Product not found" });
    });
    it("não deve retornar nada caso o id exista", async () => {
        const resultGetById = [{ id: 1, name: "Martelo de Thor" }];
      Sinon.stub(productsModel, "getById").resolves(resultGetById);
      
      Sinon.stub(productsModel, "remove").resolves();
      
      const result = await productsService.remove(1);

      expect(productsModel.remove.calledOnce).to.be.true;
      expect(result).to.be.equal(undefined);
    })
  });
  describe("Testando busca por nome do produto", () => {
    afterEach(() => {
      Sinon.restore();
    });
    it("a função 'productsModel.getByName' é chamada apenas um vez", async () => {
      Sinon.stub(productsModel, "getByName").resolves([]);

      await productsService.getByName();

      expect(productsModel.getByName.calledOnce).to.be.true;
    });

    it("a função 'productsModel.getByName' é chamada com o valor passado para 'productsService.getByName'", async () => {
      Sinon.stub(productsModel, "getByName").resolves([]);
      await productsService.getByName('martelo');
      expect(productsModel.getByName.calledWith("martelo")).to.be.true;
    });

    it("retorna um array com os objetos que possuam a palavra pesquisada", async () => {
      Sinon.stub(productsModel, "getByName").resolves([
        { id: 1, name: "Martelo de Batman" },
      ]);
      const result = await productsService.getByName("martelo");
      expect(result).to.be.an("array");
      expect(result).to.be.deep.equal([{ id: 1, name: "Martelo de Batman" }]);
    });

    it("caso nada seja passado, um array com todos os produtos são retornados", async () => {
      const resultGetByName = FULL_LIST;
      Sinon.stub(productsModel, "getByName").resolves(resultGetByName);

      const result = await productsService.getByName();

      expect(result).to.be.an("array");
      expect(result).to.be.deep.equal(resultGetByName);
    });

    it("caso o produto não exista, é retornado um array vazio", async () => {
      const resultGetByName = [];
      Sinon.stub(productsModel, "getByName").resolves(resultGetByName);

      const result = await productsService.getByName('productX');

      expect(result).to.be.an("array");
      expect(result).to.be.deep.equal([]);
    });
  });
});

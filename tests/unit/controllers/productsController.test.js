const { expect } = require("chai");
const { describe } = require("mocha");
const Sinon = require("sinon");

const productsService = require("../../../services/productsService");
const productsController = require("../../../controllers/productsController");

describe("Testando productsController; ", () => {
  describe("Testando getAll de produtos: ", () => {
    afterEach(() => {
      Sinon.restore();
    });
    it('envia o status 200 e o array de produtos', async () => {
      const req = {};
      const res = {};

      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();
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
      Sinon.stub(productsService, "getAll").resolves(resultExecute);

      await productsController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(resultExecute)).to.be.deep.equal(true);
      expect(res.status.calledOnce).to.be.true;
    });
  });
  describe("Testando getById de produtos: ", () => {
    afterEach(() => {
      Sinon.restore();
    });
    it('envia o status 404 e um objeto com a chave "message", ao receber um id que não existe', async () => {
      const req = {};
      const res = {};

      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();
      req.params = { id: 9 };
      const resultExecute = { message: "Product not found" };
      Sinon.stub(productsService, "getById").resolves(resultExecute);

      await productsController.getById(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith(resultExecute)).to.be.deep.equal(true);
      expect(res.status.calledOnce).to.be.true;
    });
    it('envia status 200 e um objeto com os dados do produto, ao receber um id valido', async () => {
    const req = {};
    const res = {};

    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns();
    req.params = { id: 1 };
    const resultExecute = { id: 1, name: "Martelo de Thor" };
    Sinon.stub(productsService, "getById").resolves(resultExecute);

    await productsController.getById(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(resultExecute)).to.be.deep.equal(true);
    expect(res.status.calledOnce).to.be.true;
    });
  });

  describe("Testando addProduct de produtos: ", () => {
    afterEach(() => {
      Sinon.restore();
    });
    it("retorna o status 201 e o um objeto", async () => {
      const req = {};
      const res = {};

      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();
      req.body = { name: "produtoX" };
      const resultExecute = { id: 4, name: "produtoX" };

      Sinon.stub(productsService, "addProduct").resolves(resultExecute);

      await productsController.addProduct(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith(resultExecute)).to.be.deep.equal(true);
      expect(res.status.calledOnce).to.be.true;
    });
  });
  describe("Testando update", () => {
    afterEach(() => {
      Sinon.restore();
    });
    it("é retornada apenas uma resposta: ", async () => {
      const req = {};
      const res = {};
      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();
      req.params = { id: 1 };
      req.body = { name: "produtoX" };

      const returnUpdate = { message: "Product not found" };
      Sinon.stub(productsService, "update").resolves(returnUpdate);

      await productsController.update(req, res);

      expect(res.status.calledOnce).to.be.true;
    });
    it('é enviado o status 404 com uma mensagem de erro', async () => {
      const req = {};
      const res = {};

      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();
      req.params = { id: 1 };
      req.body = { name: "produtoX" };

      const returnUpdate = { message: "Product not found" };
      Sinon.stub(productsService, "update").resolves(returnUpdate);

      await productsController.update(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith(returnUpdate)).to.be.deep.equal(true);
    });
    it("envia o status 200 e um objeto com os dados do produto já modificado",
      async () => {
        const req = {};
        const res = {};

        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub().returns();
        req.params = { id: 1 };
        req.body = { name: "produtoX" };

        const returnUpdate = { id: 1, name: "Martelo do Batman" };
        Sinon.stub(productsService, "update").resolves(returnUpdate);

        await productsController.update(req, res);

        expect(res.status.calledWith(200)).to.be.equal(true);
        expect(res.json.calledWith(returnUpdate)).to.be.deep.equal(true);
      });
  });
  describe("Testando remove", () => {
    afterEach(() => {
      Sinon.restore();
    });
    it("é enviado apenas uma resposta", async () => {
      const req = {};
      const res = {};
      
      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();
      res.end = Sinon.stub().returns();
      req.params = { id: 10 };
      Sinon.stub(productsService, "remove").resolves({
        message: "Product not found",
      });

      await productsController.remove(req, res);

      expect(res.status.calledOnce).to.be.true;
    });
    it("envia o status 404 e mensagem de erro, quando id não existe", async () => {
      const req = {};
      const res = {};

      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();
      res.end = Sinon.stub().returns();
      req.params = { id: 10 };
      Sinon.stub(productsService, "remove").resolves({
        message: "Product not found",
      });

      await productsController.remove(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: "Product not found" }))
        .to.be.deep.true;
      expect(res.end.notCalled).to.be.true;
    });
    it("envia apenas o status 200, caso tudo certo", async () => {
      const req = {};
      const res = {};
      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();
      res.end = Sinon.stub().returns();
      req.params = { id: 10 };
      Sinon.stub(productsService, "remove").resolves();

      await productsController.remove(req, res);

      expect(res.status.calledWith(204)).to.be.true;
      expect(res.json.notCalled).to.be.true;
      expect(res.end.calledOnce).to.be.true;
    });
  });
  describe("Testando busca por nome do produto", () => {
    afterEach(() => {
      Sinon.restore();
    });
    it("a função 'productsModel.getByName' é chamada apenas um vez",
      async () => {
        const req = {};
        const res = {};
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub().returns();
        req.query = { q: '' };
        Sinon.stub(productsService, "getByName").resolves([]);

        await productsController.getByName(req, res);

        expect(productsService.getByName.calledOnce).to.be.true;
    });
    describe("A requisição retorna o status 200 e um array, independente da resposta", () => {
      afterEach(() => {
        Sinon.restore();
      });
      it("é retornado um array com todos os produtos, quando nada é passado",
        async () => {
          const resultGetByName = [
            { id: 1, name: "Martelo de Thor" },
            { id: 2, name: "Traje de encolhimento" },
            { id: 3, name: "Escudo do Capitão América" },
          ];

          const req = {};
          const res = {};
          res.status = Sinon.stub().returns(res);
          res.json = Sinon.stub().returns();
          req.query = { q: "" };

          Sinon.stub(productsService, "getByName").resolves(resultGetByName);

          await productsController.getByName(req, res);

          expect(res.status.calledWith(200)).to.be.true;
          expect(res.json.calledWith(resultGetByName)).to.be.true;
        });
      it("caso o produto não exista, é retornado um array vazio", async () => {
        const req = {};
        const res = {};
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub().returns();
        req.query = { q: "productX" };

        Sinon.stub(productsService, "getByName").resolves([]);

        await productsController.getByName(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith([])).to.be.true;
      });
      it("retorna apenas os produtos com o nome compatível", async () => {
        const req = {};
        const res = {};
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub().returns();
        req.query = { q: "martelo" };

        Sinon.stub(productsService, "getByName")
          .resolves([{ id: 1, name: "Martelo de Thor" }]);

        await productsController.getByName(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith([{ id: 1, name: "Martelo de Thor" }]))
          .to.be.true;
      });
    });
  });
});
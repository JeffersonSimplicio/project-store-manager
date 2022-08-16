const { expect } = require("chai");
const { describe } = require("mocha");
const Sinon = require("sinon");

const salesService = require("../../../services/salesService");
const salesController = require("../../../controllers/salesController");

describe("Testando salesController; ", () => {
  describe("Testando a função getAll", () => {
    afterEach(() => {
      Sinon.restore();
    });
    it("retorna o status 200", async () => {
      const req = {};
      const res = {};

      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();
      
      const resultGetAll = [];

      Sinon.stub(salesService, "getAll").resolves(resultGetAll);

      await salesController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    })
    it("retorna um array com a lista de vendas", async () => {
      const req = {};
      const res = {};

      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();

      const resultGetAll = [
        {
          saleId: 1,
          date: "2022-08-15T18:06:20.000Z",
          productId: 1,
          quantity: 5,
        },
        {
          saleId: 1,
          date: "2022-08-15T18:06:20.000Z",
          productId: 2,
          quantity: 10,
        },
        {
          saleId: 2,
          date: "2022-08-15T18:06:20.000Z",
          productId: 3,
          quantity: 15,
        },
      ];

      Sinon.stub(salesService, "getAll").resolves(resultGetAll);

      await salesController.getAll(req, res);

      expect(res.json.calledWith(resultGetAll)).to.be.deep.equal(true);
    });
  });
  describe("Testando função getById", () => {
    afterEach(() => {
      Sinon.restore();
    });
    it('retorna apenas um a resposta:', async () => {
      const req = {};
      const res = {};

      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();
      req.params = { id: 9 };

      const resultGetById = { message: "Sale not found" };

      Sinon.stub(salesService, "getById").resolves(resultGetById);

      await salesController.getById(req, res);

      expect(res.status.calledOnce).to.be.true;
    });
    it("retorna status 404 e uma mensagem de erro quando id não é encontrado",
      async () => {
        const req = {};
        const res = {};

        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub().returns();
        req.params = { id: 9 };

        const resultGetById = { message: "Sale not found" };
        Sinon.stub(salesService, "getById").resolves(resultGetById);

        await salesController.getById(req, res);

        expect(res.status.calledWith(404)).to.be.equal(true);
        expect(res.json.calledWith(resultGetById)).to.be.deep.equal(true);
      });
    it("retorna o status 200 e um array com os dados do respectivo id",
      async () => {
        const req = {};
        const res = {};

        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub().returns();
        req.params = { id: 1 };

        const resultGetById = [
          {
            date: "2022-08-15T18:06:20.000Z",
            productId: 1,
            quantity: 5,
          },
          {
            date: "2022-08-15T18:06:20.000Z",
            productId: 2,
            quantity: 10,
          },
        ];

        Sinon.stub(salesService, "getById").resolves(resultGetById);

        await salesController.getById(req, res);

        expect(res.status.calledWith(200)).to.be.equal(true);
        expect(res.json.calledWith(resultGetById)).to.be.deep.equal(true);
      });
  });
  describe("Testando função newSale: ", () => {
    afterEach(() => {
      Sinon.restore();
    });
    it("retorna o status 404 e uma mensagem de erro", async () => {
      const req = {};
      const res = {};

      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();

      req.body = [
        { productId: 1, quantity: 1 },
        { productId: 5, quantity: 5 },
      ];

      const resultNewSale = { message: "Product not found" };

      Sinon.stub(salesService, "newSale").resolves(resultNewSale);

      await salesController.newSale(req, res);

      expect(res.json.calledWith(resultNewSale)).to.be.deep.equal(true);
    });
    it("a requisição tem uma única resposta em caso de erro", async () => {
      const req = {};
      const res = {};

      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();

      req.body = [
        { productId: 1, quantity: 1 },
        { productId: 5, quantity: 5 },
      ];

      const resultNewSale = { message: "Product not found" };

      Sinon.stub(salesService, "newSale").resolves(resultNewSale);

      await salesController.newSale(req, res);

      expect(res.status.calledOnce).to.be.true;
    });
    it("retorna o status 201 e um objeto quando tudo OK", async () => {
      const req = {};
      const res = {};

      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();

      req.body = [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 5 },
      ];

      const resultNewSale = {
        id: 3,
        itemsSold: [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 5 },
        ],
      };

      Sinon.stub(salesService, "newSale").resolves(resultNewSale);

      await salesController.newSale(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith(resultNewSale)).to.be.deep.equal(true);
    });
    it("a requisição é respondida apenas uma vez caso tudo ok",
      async () => {
        const req = {};
        const res = {};

        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub().returns();

        req.body = [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 5 },
        ];

        const resultNewSale = {
          id: 3,
          itemsSold: [
            { productId: 1, quantity: 1 },
            { productId: 2, quantity: 5 },
          ],
        };

        Sinon.stub(salesService, "newSale").resolves(resultNewSale);

        await salesController.newSale(req, res);

        expect(res.status.calledOnce).to.be.true;
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
      Sinon.stub(salesService, "remove").resolves({
        message: "Product not found",
      });

      await salesController.remove(req, res);

      expect(res.status.calledOnce).to.be.true;
    });
    it("envia o status 404 e mensagem de erro, quando id não existe", async () => {
      const req = {};
      const res = {};

      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();
      res.end = Sinon.stub().returns();
      req.params = { id: 10 };
      Sinon.stub(salesService, "remove").resolves({
        message: "Sale not found",
      });

      await salesController.remove(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: "Sale not found" })).to.be
        .deep.true;
      expect(res.end.notCalled).to.be.true;
    });
    it("envia apenas o status 200, caso tudo certo", async () => {
      const req = {};
      const res = {};

      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();
      res.end = Sinon.stub().returns();
      req.params = { id: 1 };
      Sinon.stub(salesService, "remove").resolves();

      await salesController.remove(req, res);

      expect(res.status.calledWith(204)).to.be.true;
      expect(res.json.notCalled).to.be.true;
      expect(res.end.calledOnce).to.be.true;
    });
  });
  describe("Testando update", () => {
    afterEach(() => {
      Sinon.restore();
    });
    it("caso o produto não exista, retorna um status 404 e uma mensagem de erro",
      async () => {
        const req = {};
        const res = {};

        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub().returns();
        req.params = { id: 10 };
        req.body = [
          { productId: 1, quantity: 10 },
          { productId: 2, quantity: 50 },
        ];
        Sinon.stub(salesService, "update")
          .resolves({ message: "Product not found" });
        
        await salesController.update(req, res);
        
        expect(res.status.calledWith(404)).to.be.true;
        expect(res.json.calledWith({ message: "Product not found" }))
          .to.be.deep.true;
      });
    it("caso a venda não exista é retornado o status 404 e uma mensagem de erro",
      async () => {
        const req = {};
        const res = {};

        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub().returns();
        req.params = { id: 1 };
        req.body = [
          { productId: 1, quantity: 10 },
          { productId: 10, quantity: 50 },
        ];
        Sinon.stub(salesService, "update").resolves({
          message: "Sale not found",
        });

        await salesController.update(req, res);

        expect(res.status.calledWith(404)).to.be.true;
        expect(res.json.calledWith({ message: "Sale not found" })).to.be.deep
          .true;
      });
    it("caso os dados estejam coerentes, retorna o status 200 e um objeto com os novos dados", async () => {
      const req = {};
      const res = {};
      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();
      req.params = { id: 1 };
      req.body = [
        { productId: 1, quantity: 10 },
        { productId: 2, quantity: 50 },
      ];
      const expectedOutcome = {
        saleId: req.params,
        itemsUpdated: req.body,
      };
      Sinon.stub(salesService, "update").resolves(expectedOutcome);

      await salesController.update(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(expectedOutcome)).to.be.deep.true;
    });
  });
});

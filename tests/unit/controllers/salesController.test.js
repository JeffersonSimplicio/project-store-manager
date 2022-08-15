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
});

const { expect } = require("chai");
const { describe } = require("mocha");
const Sinon = require("sinon");

const salesModel = require("../../../models/salesModel");
const connection = require("../../../models/connection");
const { execute } = require("../../../models/connection");

describe("Testando salesModel", () => {
  describe("Testando a função addSale", () => {
    afterEach(() => {
      Sinon.restore();
    });
    it("a função retorna o id da comprar", async () => {
      const resultExecute = { insertId: 4 };
      Sinon.stub(connection, "execute").resolves([resultExecute]);

      const result = await salesModel.addSale();
      expect(result).to.be.equal(4);
    });
    it("a função 'execute' é chamada apenas uma vez", async () => {
      const resultExecute = { insertId: 4 };
      Sinon.stub(connection, "execute").resolves([resultExecute]);

      await salesModel.addSale();

      expect(connection.execute.calledOnce).to.be.true;
    });
  });
  describe("Testando a função linkBuyProducts", () => {
    afterEach(() => {
      Sinon.restore();
    });
    it("A função 'execute' é chamada apenas uma vez", async () => {
      Sinon.stub(connection, "execute").resolves();

      await salesModel.linkBuyProducts(4, { productId: 2, quantity: 3 });
      
      expect(connection.execute.calledOnce).to.be.true;
    });
  });
});
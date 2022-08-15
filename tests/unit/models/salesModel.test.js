const { expect } = require("chai");
const { describe, it } = require("mocha");
const Sinon = require("sinon");

const salesModel = require("../../../models/salesModel");
const connection = require("../../../models/connection");

describe("Testando salesModel", () => {
  describe("Testando a função getAll", () => {
    afterEach(() => {
      Sinon.restore();
    });
    it("é retornado um array", async () => {
      const resultExecute = [
        {
          saleId: 1,
          date: '2022-08-15T18:06:20.000Z',
          productId: 1,
          quantity: 5
        },
        {
          saleId: 1,
          date: '2022-08-15T18:06:20.000Z',
          productId: 2,
          quantity: 10
        },
        {
          saleId: 2,
          date: '2022-08-15T18:06:20.000Z',
          productId: 3,
          quantity: 15
        }
      ];
      Sinon.stub(connection, "execute").resolves([resultExecute]);

      const result = await salesModel.getAll();

      expect(result).to.be.an("array");
    });
    it('a função retorna um array com todos as vendas', async () => {
      const resultExecute = [
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
      Sinon.stub(connection, "execute").resolves([resultExecute]);

      const result = await salesModel.getAll();

      expect(result).to.be.deep.equal(resultExecute);
    })
  });
  describe("Testando a função getById", () => {
    afterEach(() => {
      Sinon.restore();
    });
    it('retorna um array vazio ao receber um id que não exista', async () => {
      const resultExecute = []
      Sinon.stub(connection, "execute").resolves([resultExecute]);

      const result = await salesModel.getById(8);

      expect(result).to.be.deep.equal(resultExecute);
    });
    it("a função retorna um array apenas com as vendas do id repassado", async () => {
      const resultExecute = [
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
      Sinon.stub(connection, "execute").resolves([resultExecute]);

      const result = await salesModel.getById(1);

      expect(result).to.be.deep.equal(resultExecute);
    });
  })
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

// [
//   {
//     saleId: 1,
//     date: 2022-08-15T18:06:20.000Z,
//     productId: 1,
//     quantity: 5
//   },
//   {
//     saleId: 1,
//     date: 2022-08-15T18:06:20.000Z,
//     productId: 2,
//     quantity: 10
//   },
//   {
//     saleId: 2,
//     date: 2022-08-15T18:06:20.000Z,
//     productId: 3,
//     quantity: 15
//   }
// ]
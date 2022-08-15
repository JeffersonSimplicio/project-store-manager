const { expect } = require("chai");
const { describe } = require("mocha");
const Sinon = require("sinon");

const salesModel = require("../../../models/salesModel");
const salesServices = require("../../../services/salesService");

describe("Testando salesService; ", () => {
  describe("Testando newSale de sales: ", () => {
    afterEach(() => {
      Sinon.restore();
    });
    it("Ao receber uma lista de items, em que o product Id não existe retorna uma mensagem de erro", async () => {
      const shoppingList = [
        { productId: 1, quantity: 1 },
        { productId: 15, quantity: 5 },
      ];
      const resultGetByIdOne = [{ "id": 1, "name": "Martelo de Thor" }];
      const resultGetByIdTwo = [];
      Sinon.stub(Promise, "all").resolves([resultGetByIdOne, resultGetByIdTwo]);
      
      const result = await salesServices.newSale(shoppingList);
      
      expect(result).to.be.deep.equal({ message: "Product not found" });
    });
    it("a função linkBuyProducts é chamada quantas vezes forem necessárias",
      async () => {
        const resultAddSale = 4;
        Sinon.stub(salesModel, "addSale").resolves(resultAddSale);

        const resultLinkBuyProducts = [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 5 },
        ];
        Sinon.stub(salesModel, "linkBuyProducts").resolves(resultLinkBuyProducts);

        await salesServices.newSale(resultLinkBuyProducts);

        expect(salesModel.linkBuyProducts.calledTwice).to.be.true;
      });
    it("retorna um objeto no formato desejado", async () => {
      const resultAddSale = 3;
      Sinon.stub(salesModel, "addSale").resolves(resultAddSale);

      const resultLinkBuyProducts = [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 5 },
      ];
      Sinon.stub(salesModel, "linkBuyProducts").resolves(resultLinkBuyProducts);

      const expectedResultNewSale = {
        id: 3,
        itemsSold: [
          {
            productId: 1,
            quantity: 1,
          },
          {
            productId: 2,
            quantity: 5,
          },
        ],
      }; ;

      const result = await salesServices.newSale(resultLinkBuyProducts);

      expect(result).to.be.deep.equal(expectedResultNewSale);
    });
  });
});

const { expect } = require("chai");
const { describe, it } = require("mocha");
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
    it("a função retorna um objeto com a lista de vendas feitas e seu id",
      async () => {
        const resultAddSale = 3;
        Sinon.stub(salesModel, "addSale").resolves(resultAddSale);

        const resultLinkBuyProducts = [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 5 },
        ];
        Sinon.stub(Promise, "all").resolves([
          resultLinkBuyProducts[0],
          resultLinkBuyProducts[1],
        ]);

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
        };

        const result = await salesServices.newSale(resultLinkBuyProducts);

        expect(result).to.be.deep.equal(expectedResultNewSale);
      });
  });
});

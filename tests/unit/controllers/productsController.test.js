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
});
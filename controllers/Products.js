const rescue = require('express-rescue');
const service = require('../services/Products');

const CREATED = 201;
const OK = 200;

const createProduct = rescue(async (req, res, next) => {

  const { name, quantity } = req.body;

  const newProduct = await service.create(name, quantity);

  if (newProduct.err) return next(newProduct.err);

  return res.status(CREATED).json(newProduct);
});

const listProducts = rescue(async (_req, res, _next) => {
  const productsList = await service.listProducts();

  return res.status(OK).json(productsList);

});

const getProductById = rescue(async (req, res, next) => {

  const { id } = req.params;

  const foundProduct = await service.findProductById(id);

  if (foundProduct.err) return next(foundProduct.err);

  return res.status(OK).json(foundProduct);
});

const updateProduct = rescue(async (req, res, next) => {

  const { id } = req.params;

  const { name, quantity } = req.body;

  const updateData = await service.updateProduct(id, name, quantity);

  if (updateData.err) return next(updateData.err);

  return res.status(OK).json(updateData);

});

const deleteProduct = rescue(async (req, res, next) => {

  const { id } = req.params;
  const productToDelete = await service.deleteProduct(id);

  if (productToDelete.err) return next(productToDelete.err);

  return res.status(OK).json(productToDelete);

});

module.exports = {
  createProduct,
  listProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};

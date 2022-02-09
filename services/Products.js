const Product = require('../models/Products');
const { ObjectId } = require('mongodb');

const nameLength = 5;
const quantitySize = 0;
const invalidData = {
  err: {
    code: 'invalid_data',
    message: 'Wrong id format',
  }
};

const validateData = async (name, quantity) => {

  if (name.length < nameLength) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }

  if (quantity < quantitySize || quantity == quantitySize) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    };
  }

  if (typeof(quantity) !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      }
    };
  }
  const existingProduct = await Product.findByName(name);

  if (existingProduct) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      }
    };
  }
};

const create = async (name, quantity) => {

  const data = await validateData(name, quantity);

  if (data) return data;

  return Product.create(name, quantity);
};

const listProducts = async () => {
  const produto = await Product.listProducts();

  const products = {
    'products': produto
  };

  return products;

};

const idValidation = (id) => {

  if (!ObjectId.isValid(id)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      }
    };
  }

};

const findProductById = async (id) => {

  const validId = idValidation(id);

  if (validId) return invalidData;

  const product = await Product.getProductById(id);

  if (!product) {
    return invalidData;
  }

  return product;
};

const updateProduct = async (id, name, quantity) => {

  const data = await validateData(name, quantity);

  if (data) return data;


  const produto = await Product.getProductByIdAndUpdate(id, name, quantity);

  return produto;
};

const deleteProduct = async (id) => {
  const validId = await idValidation(id);

  if (validId) return validId;
  const productDeleted = await Product.deleteProduct(id);

  return productDeleted;
};

module.exports = {
  create,
  listProducts,
  idValidation,
  updateProduct,
  deleteProduct,
  findProductById,
};

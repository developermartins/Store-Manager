const Sales = require('../models/Sales');
const { ObjectId } = require('mongodb');

const quantitySize = 0;
const invalidData = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity'
  }
};

const invalidId = {
  err: {
    code: 'invalid_data',
    message: 'Wrong sale ID format',
  }
};

const notFound = {
  err: {
    code: 'not_found',
    message: 'Sale not found',
  }
};

const validateSales = (sale) => {

  const testSale = sale
    .every((i) => i.quantity > quantitySize && typeof i.quantity === 'number');

  if (!testSale) return invalidData;

};

const registerSales = async (sale) => {

  const data = validateSales(sale);

  if (data) return data;

  const sales = await Sales.registerSales(sale);


  return sales;
};

const saleIdValidation = (id) => {

  if (!ObjectId.isValid(id)) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      }
    };
  }

};

const listSales = async () => {
  const sales = await Sales.getSales();

  const salesList = {
    'sales': sales
  };

  return salesList;
};

const getSalesListById = async (id) => {
  const validId = saleIdValidation(id);

  if (validId) return notFound;

  const salesList = await Sales.getSalesListById(id);

  if (!salesList) {
    return notFound;
  }

  return salesList;
};

const updateSales = async (id, sale) => {
  const data = await validateSales(sale);

  if (data) return data;

  const sales = await Sales.updateSalesList(id, sale);

  return sales;
};

const deleteSale = async (id) => {
  const validateId = await saleIdValidation(id);

  if (validateId) return invalidId;

  const saleDeleted = await Sales.deleteSale(id);
  console.log(saleDeleted);
  return saleDeleted;
};

module.exports = {
  registerSales,
  listSales,
  saleIdValidation,
  getSalesListById,
  updateSales,
  deleteSale,
};

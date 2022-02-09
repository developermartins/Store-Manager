const connection = require('./connection');
const { ObjectId } = require('mongodb');

const registerSales = (sale) => connection()
  .then((db) => db.collection('sales').insertOne({ itensSold: sale }))
  .then(result => result.ops[0]);

const getSales = () => connection()
  .then((db) => db.collection('sales').find().toArray());

const getSalesListById = async (_id) => connection()
  .then((db) => db.collection('sales').findOne(new ObjectId(_id)));

const updateSalesList = (id, sale) => connection()
  .then((db) => db.collection('sales')
    .findOneAndUpdate(
      {_id: ObjectId(id)},
      { $set: { itensSold: sale } },
      { returnOriginal:false })
  )
  .then(result => result.value);

const deleteSale = (id) => connection()
  .then((db) => db.collection('sales').remove({ _id: ObjectId(id) }));

module.exports = {
  registerSales,
  getSales,
  getSalesListById,
  updateSalesList,
  deleteSale,
};

const express = require('express');
const bodyParser = require('body-parser');
const Product = require('./controllers/Products');
const Sales = require('./controllers/Sales');
const errorMiddleware = require('./middlewares/error');
const app = express();

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const port = 3000;


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', Product.createProduct);

app.get('/products', Product.listProducts);

app.get('/products/:id', Product.getProductById);

app.put('/products/:id', Product.updateProduct);

app.delete('/products/:id', Product.deleteProduct);

app.post('/sales', Sales.registerSales);

app.get('/sales', Sales.getSales);

app.get('/sales/:id', Sales.getSalesListById);

app.put('/sales/:id', Sales.updateSales);

app.delete('/sales/:id', Sales.deleteSale);

app.use(errorMiddleware);

app.listen(port, () => console.log(`App listening on port ${port}!`));
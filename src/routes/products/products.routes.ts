import { ProductsModel } from '../../models/models.products';
import express from 'express';
import verifyAuthToken from '../verification';
import bodyParser from 'body-parser';

const jsonParser = bodyParser.json();
const model = new ProductsModel();

const productsRoutes = () => {
  const router = express.Router();

  router.get('/', model.getAllProducts);

  router.get('/:id', model.getProductById);

  router.get('/category/:product_category', model.getProductByCategory);

  router.get('/orders/top', model.getTopFive);

  router.post('/', jsonParser, verifyAuthToken, model.createProduct);

  return router;
};

export default productsRoutes;

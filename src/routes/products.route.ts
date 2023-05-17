import { ProductsController } from '../controllers/products.controller';
import verifyAuthToken from '../services/verification';
import bodyParser from 'body-parser';
import express from 'express';

const jsonParser = bodyParser.json();
const controller = new ProductsController();

const productsRoute = () => {
  const router = express.Router();

  router.get('/', controller.getAllProducts);

  router.get('/:id', controller.getProductById);

  router.get('/category/:product_category', controller.getProductByCategory);

  router.get('/orders/top', controller.getTopFive);

  router.post('/create', jsonParser, verifyAuthToken, controller.createProduct);

  return router;
};

export default productsRoute;

import { OrdersController } from '../controllers/orders.controller';
import verifyAuthToken from '../services/verification';
import bodyParser from 'body-parser';
import express from 'express';

const jsonParser = bodyParser.json();
const controller = new OrdersController();

const orderRoutes = () => {
  const router = express.Router();

  router.get('/', verifyAuthToken, controller.getAllOrders);

  router.get('/:id', verifyAuthToken, controller.getOrderById);

  router.get(
    '/status/active/:user_id',
    verifyAuthToken,
    controller.getActiveOrdersByUserId
  );

  router.get(
    '/status/complete/:user_id',
    verifyAuthToken,
    controller.getCompleteOrdersByUserId
  );

  router.get('/cart/products', verifyAuthToken, controller.getProductsInOrder);

  router.post('/create', jsonParser, verifyAuthToken, controller.createOrder);

  router.post(
    '/:order_id/products',
    jsonParser,
    verifyAuthToken,
    controller.addProductToOrder
  );

  return router;
};

export default orderRoutes;

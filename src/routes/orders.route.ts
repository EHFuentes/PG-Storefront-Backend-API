import express from 'express';
import { OrdersController } from '../controllers/orders.controller';
import verifyAuthToken from '../services/verification';
import bodyParser from 'body-parser';

const jsonParser = bodyParser.json();
const controller = new OrdersController();

const orderRoutes = () => {
  const router = express.Router();

  router.get('/', verifyAuthToken, controller.getAllOrders);

  router.get('/:id', verifyAuthToken, controller.getOrderById);

  router.get(
    '/active/usr/:user_id',
    verifyAuthToken,
    controller.getActiveOrdersByUserId
  );

  router.get(
    '/complete/usr/:user_id',
    verifyAuthToken,
    controller.getCompleteOrdersByUserId
  );

  router.post('/create', jsonParser, verifyAuthToken, controller.createOrder);

  return router;
};

export default orderRoutes;

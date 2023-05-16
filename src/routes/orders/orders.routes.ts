import express from 'express';
import { OrdersModel } from '../../models/models.orders';
import verifyAuthToken from '../verification';
import bodyParser from 'body-parser';

const jsonParser = bodyParser.json();
const model = new OrdersModel();

const orderRoutes = () => {
  const router = express.Router();

  router.get('/', verifyAuthToken, model.getAllOrders);

  router.get('/:id', verifyAuthToken, model.getOrderById);

  router.get(
    '/active/usr/:user_id',
    verifyAuthToken,
    model.getActiveOrdersByUserId
  );

  router.get(
    '/complete/usr/:user_id',
    verifyAuthToken,
    model.getCompleteOrdersByUserId
  );

  router.post('/create', jsonParser, verifyAuthToken, model.createOrder);

  return router;
};

export default orderRoutes;

import { Request, Response } from 'express';
import { OrdersController } from '../routes/orders/orders.controller';

const controller = new OrdersController();

export class OrdersModel {
  async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await controller.index();
      res.status(200).json(orders);
    } catch (err) {
      res.status(400).json('No orders found!');
    }
  }

  async getOrderById(req: Request, res: Response) {
    try {
      const order = await controller.show(req.params.id);
      res.status(200).json(order);
    } catch {
      res.status(400).json('No order found!');
    }
  }

  async getActiveOrdersByUserId(req: Request, res: Response) {
    try {
      const order = await controller.currentOrders(req.params.user_id);
      res.status(200).json(order);
    } catch {
      res.status(400).json('No order found!');
    }
  }

  async getCompleteOrdersByUserId(req: Request, res: Response) {
    try {
      const order = await controller.ordersByUsers(req.params.user_id);
      res.status(200).json(order);
    } catch {
      res.status(400).json('No order found!');
    }
  }

  async createOrder(req: Request, res: Response) {
    try {
      const order = await controller.create(req.body);
      res.status(200).json(order);
    } catch (err) {
      res.status(400).json('Could not create order!');
    }
  }
}

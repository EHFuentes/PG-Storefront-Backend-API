"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const orders_model_1 = require("../models/orders.model");
const model = new orders_model_1.OrdersModel();
class OrdersController {
    async getAllOrders(req, res) {
        try {
            const orders = await model.index();
            res.status(200).json(orders);
        }
        catch (err) {
            res.status(400).json('No orders found!');
        }
    }
    async getOrderById(req, res) {
        try {
            const order = await model.show(req.params.id);
            res.status(200).json(order);
        }
        catch {
            res.status(400).json('No order found!');
        }
    }
    async getActiveOrdersByUserId(req, res) {
        try {
            const order = await model.currentOrders(req.params.user_id);
            res.status(200).json(order);
        }
        catch {
            res.status(400).json('No order found!');
        }
    }
    async getCompleteOrdersByUserId(req, res) {
        try {
            const order = await model.ordersByUsers(req.params.user_id);
            res.status(200).json(order);
        }
        catch {
            res.status(400).json('No order found!');
        }
    }
    async createOrder(req, res) {
        try {
            const order = await model.create(req.body);
            res.status(200).json(order);
        }
        catch (err) {
            res.status(400).json('Could not create order!');
        }
    }
}
exports.OrdersController = OrdersController;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_controller_1 = require("../controllers/orders.controller");
const verification_1 = __importDefault(require("../services/verification"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const jsonParser = body_parser_1.default.json();
const controller = new orders_controller_1.OrdersController();
const orderRoutes = () => {
    const router = express_1.default.Router();
    router.get('/', verification_1.default, controller.getAllOrders);
    router.get('/:id', verification_1.default, controller.getOrderById);
    router.get('/status/active/:user_id', verification_1.default, controller.getActiveOrdersByUserId);
    router.get('/status/complete/:user_id', verification_1.default, controller.getCompleteOrdersByUserId);
    router.post('/create', jsonParser, verification_1.default, controller.createOrder);
    return router;
};
exports.default = orderRoutes;

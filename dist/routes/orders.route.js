"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var orders_controller_1 = require("../controllers/orders.controller");
var verification_1 = __importDefault(require("../services/verification"));
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var jsonParser = body_parser_1.default.json();
var controller = new orders_controller_1.OrdersController();
var orderRoutes = function () {
    var router = express_1.default.Router();
    router.get('/', verification_1.default, controller.getAllOrders);
    router.get('/:id', verification_1.default, controller.getOrderById);
    router.get('/status/active/:user_id', verification_1.default, controller.getActiveOrdersByUserId);
    router.get('/status/complete/:user_id', verification_1.default, controller.getCompleteOrdersByUserId);
    router.get('/cart/products', verification_1.default, controller.getProductsInOrder);
    router.post('/create', jsonParser, verification_1.default, controller.createOrder);
    router.post('/:order_id/products', jsonParser, verification_1.default, controller.addProductToOrder);
    return router;
};
exports.default = orderRoutes;

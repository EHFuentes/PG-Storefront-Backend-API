"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var orders_controller_1 = require("../controllers/orders.controller");
var verification_1 = __importDefault(require("../services/verification"));
var body_parser_1 = __importDefault(require("body-parser"));
var jsonParser = body_parser_1.default.json();
var model = new orders_controller_1.OrdersModel();
var orderRoutes = function () {
    var router = express_1.default.Router();
    router.get('/', verification_1.default, model.getAllOrders);
    router.get('/:id', verification_1.default, model.getOrderById);
    router.get('/active/usr/:user_id', verification_1.default, model.getActiveOrdersByUserId);
    router.get('/complete/usr/:user_id', verification_1.default, model.getCompleteOrdersByUserId);
    router.post('/create', jsonParser, verification_1.default, model.createOrder);
    return router;
};
exports.default = orderRoutes;

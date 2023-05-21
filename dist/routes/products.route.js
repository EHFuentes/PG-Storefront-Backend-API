"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var products_controller_1 = require("../controllers/products.controller");
var verification_1 = __importDefault(require("../services/verification"));
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var jsonParser = body_parser_1.default.json();
var controller = new products_controller_1.ProductsController();
var productsRoute = function () {
    var router = express_1.default.Router();
    router.get('/', controller.getAllProducts);
    router.get('/:id', controller.getProductById);
    router.get('/category/:product_category', controller.getProductByCategory);
    router.get('/orders/top', controller.getTopFive);
    router.post('/create', jsonParser, verification_1.default, controller.createProduct);
    return router;
};
exports.default = productsRoute;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_controller_1 = require("../controllers/products.controller");
const verification_1 = __importDefault(require("../services/verification"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const jsonParser = body_parser_1.default.json();
const controller = new products_controller_1.ProductsController();
const productsRoute = () => {
    const router = express_1.default.Router();
    router.get('/', controller.getAllProducts);
    router.get('/:id', controller.getProductById);
    router.get('/category/:product_category', controller.getProductByCategory);
    router.get('/orders/top', controller.getTopFive);
    router.post('/', jsonParser, verification_1.default, controller.createProduct);
    return router;
};
exports.default = productsRoute;

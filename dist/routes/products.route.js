"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var products_controller_1 = require("../controllers/products.controller");
var express_1 = __importDefault(require("express"));
var verification_1 = __importDefault(require("../services/verification"));
var body_parser_1 = __importDefault(require("body-parser"));
var jsonParser = body_parser_1.default.json();
var model = new products_controller_1.ProductsModel();
var productsRoute = function () {
    var router = express_1.default.Router();
    router.get('/', model.getAllProducts);
    router.get('/:id', model.getProductById);
    router.get('/category/:product_category', model.getProductByCategory);
    router.get('/orders/top', model.getTopFive);
    router.post('/', jsonParser, verification_1.default, model.createProduct);
    return router;
};
exports.default = productsRoute;

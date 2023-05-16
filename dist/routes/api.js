"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_route_1 = __importDefault(require("./products.route"));
const orders_route_1 = __importDefault(require("./orders.route"));
const users_route_1 = __importDefault(require("./users.route"));
const api = (0, express_1.default)();
// define a route handler for the default home page
const home = async (req, res) => {
    res.send('Hello World!');
};
api.get('/', home);
// Middleware
api.use('/users', (0, users_route_1.default)());
api.use('/products', (0, products_route_1.default)());
api.use('/orders', (0, orders_route_1.default)());
exports.default = api;

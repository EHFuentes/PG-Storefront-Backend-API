"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const products_model_1 = require("../models/products.model");
const model = new products_model_1.ProductsModel();
class ProductsController {
    async getAllProducts(req, res) {
        try {
            const products = await model.index();
            res.status(200).json(products);
        }
        catch (err) {
            res.status(400).json('No products found!');
        }
    }
    async getProductById(req, res) {
        try {
            const product = await model.show(req.params.id);
            res.status(200).json(product);
        }
        catch {
            res.status(400).json('No product found!');
        }
    }
    async getProductByCategory(req, res) {
        try {
            const product = await model.productCategory(req.params.product_category);
            res.status(200).json(product);
        }
        catch {
            res.status(400).json('No product found!');
        }
    }
    async getTopFive(req, res) {
        try {
            const products = await model.getTopFive();
            res.status(200).json(products);
        }
        catch (err) {
            res.status(400).json('Could not get top 5 products');
        }
    }
    async createProduct(req, res) {
        if (typeof req.body.product_name !== 'string' ||
            typeof req.body.price !== 'string' ||
            typeof req.body.product_category !== 'string') {
            res.status(400).json('Invalid data type');
            return;
        }
        if (!req.body.product_name.trim() ||
            !req.body.price.trim() ||
            !req.body.product_category.trim()) {
            res.status(400).json('Missing required fields!');
            return;
        }
        try {
            const product = await model.create(req.body);
            res.status(201).json(product);
        }
        catch (err) {
            res.status(400).json('Could not create product!');
        }
    }
}
exports.ProductsController = ProductsController;

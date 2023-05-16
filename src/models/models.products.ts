import { ProductsController } from '../routes/products/products.controller';
import { Request, Response } from 'express';

const controller = new ProductsController();

export class ProductsModel {
  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await controller.index();
      res.status(200).json(products);
    } catch (err) {
      res.status(400).json('No products found!');
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const product = await controller.show(req.params.id);
      res.status(200).json(product);
    } catch {
      res.status(400).json('No product found!');
    }
  }

  async getProductByCategory(req: Request, res: Response) {
    try {
      const product = await controller.productCategory(
        req.params.product_category
      );
      res.status(200).json(product);
    } catch {
      res.status(400).json('No product found!');
    }
  }

  async getTopFive(req: Request, res: Response) {
    try {
      const products = await controller.getTopFive();
      res.status(200).json(products);
    } catch (err) {
      res.status(400).json('Could not get top 5 products');
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const product = await controller.create(req.body);
      res.status(200).json(product);
    } catch (err) {
      res.status(400).json('Count not create product!');
    }
  }
}

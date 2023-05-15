import { ProductsController } from './products.controller';
import express, { Request, Response } from 'express';
import verifyAuthToken from '../verification';
import bodyParser from 'body-parser';

const jsonParser = bodyParser.json();
const controller = new ProductsController();
const productsRoutes = () => {
  const router = express.Router();

  router.get('/', verifyAuthToken, async (req: Request, res: Response) => {
    try {
      const products = await controller.index();
      res.status(200).json(products);
    } catch (err) {
      res.status(400).json('No products found, check product table!');
    }
  });

  router.get('/:id', verifyAuthToken, async (req: Request, res: Response) => {
    try {
      const product = await controller.show(req.params.id);
      res.status(200).json(product);
    } catch (err) {
      res.status(400).json('No product found!, check product table!');
    }
  });

  router.post(
    '/',
    jsonParser,
    verifyAuthToken,
    async (req: Request, res: Response) => {
      try {
        const newProduct = await controller.create(req.body);
        res.status(200).json(newProduct);
      } catch (err) {
        res.status(400).json('Product not created!');
      }
    }
  );
  return router;
};

export default productsRoutes;

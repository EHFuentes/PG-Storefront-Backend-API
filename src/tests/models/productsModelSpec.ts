import { ProductsModel } from '../../models/products.model';

type Products = {
  id?: number;
  price: number;
  product_name: string;
  product_category: string;
};

describe('ProductsModel', function () {
  let productsModel: ProductsModel;

  beforeEach(() => {
    productsModel = new ProductsModel();
  });

  it('should be able to create a product', async () => {
    const product: Products = {
      product_name: 'test product',
      price: 10,
      product_category: 'test_category',
    };

    await productsModel.create(product);

    expect(product.product_name).toEqual('test product');
    expect(product.price).toEqual(10);
    expect(product.product_category).toEqual('test_category');
  });

  it('should be able to get a product by id', async () => {
    const product = await productsModel.show('1');

    expect(product.id).toEqual(1);
  });

  it('should be able to get all products', async () => {
    const products = await productsModel.index();

    expect(products.length).toBeGreaterThan(0);
  });

  it('should be able to get products by category', async () => {
    const category = 'test_category';
    const products = await productsModel.productCategory(category);

    expect(products).toBeDefined();
    expect(products.length).toBeGreaterThan(0);
    products.forEach((product) => {
      expect(product.product_category).toEqual(category);
    });
  });

  it('should be able to get top 5 products', async () => {
    const products = await productsModel.getTopFive();

    expect(products).toBeDefined();
    expect(products.length).toBeGreaterThan(0);
  });
});

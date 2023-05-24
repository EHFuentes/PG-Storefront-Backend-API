import { OrdersModel } from '../../models/orders.model';

type Orders = {
  id?: number;
  order_id: number;
  product_id?: number;
  product_quantity?: number;
  user_id: number;
  order_status: string;
};

describe('OrdersModel', () => {
  let ordersModel: OrdersModel;

  beforeEach(() => {
    ordersModel = new OrdersModel();
  });

  it('should be able to create an order', async () => {
    const order: Orders = {
      order_id: 1,
      user_id: 1,
      order_status: 'complete',
    };

    await ordersModel.create(order);

    expect(order.order_id).toEqual(1);
    expect(order.user_id).toEqual(1);
    expect(order.order_status).toEqual('complete');
  });

  it('should be able to get an order by id', async () => {
    const orders = await ordersModel.show('1');

    const order = orders[0];

    expect(orders.length).toBeGreaterThan(0);
    expect(order.id).toEqual(1);
    expect(order.user_id).toEqual(1);
    expect(order.order_status).toEqual('active');
  });

  it('should be able to get all orders', async () => {
    const orders = await ordersModel.index();

    expect(orders.length).toBeGreaterThan(0);
  });

  it('should be able to get active orders by user id', async () => {
    const orders = await ordersModel.currentOrders('1');

    const order = orders[0];

    expect(orders.length).toBeGreaterThan(0);
    expect(order.order_status).toEqual('active');
    expect(order.user_id).toEqual(1);
  });

  it('should be able to add a product to an order', async () => {
    // create a new order
    const product_id = 1;
    const product_quantity = 2;

    // retrieve all orders
    const orders = await ordersModel.index();

    // get the id of the last order
    let order_id: number | undefined;
    if (orders.length > 0) {
      order_id = orders[orders.length - 1].id;
    }

    // if we have a valid orderId, we can proceed to add a product
    if (order_id !== undefined) {
      // add a product to the last order
      const result = await ordersModel.addProduct(
        order_id,
        product_id,
        product_quantity
      );

      // get the added product
      const addedProduct: Orders = result[0];

      expect(result.length).toBeGreaterThan(0);
      expect(addedProduct.order_id).toEqual(order_id);
      expect(addedProduct.product_id).toEqual(1);
      expect(addedProduct.product_quantity).toEqual(2);
    } else {
      fail('No orders available for testing.');
    }
  });

  // get products in order
  it('should be able to get products in an order', async () => {
    // retrieve all orders
    const orders = await ordersModel.index();

    // get the id of the last order
    let order_id: number | undefined;
    if (orders.length > 0) {
      order_id = orders[orders.length - 1].id;
    }

    // if we have a valid orderId, we can proceed to add a product
    if (order_id !== undefined) {
      // get products in the last order
      const result = await ordersModel.getProductsInOrder();

      // get the added product
      const products: Orders[] = result;

      expect(result.length).toBeGreaterThan(0);
      expect(products[0].product_id).toEqual(1);
      expect(products[0].product_quantity).toEqual(2);
    } else {
      fail('No orders available for testing.');
    }
  });
});

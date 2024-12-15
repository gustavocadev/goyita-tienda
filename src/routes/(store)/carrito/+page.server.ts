import { redirect } from '@sveltejs/kit';
import type {
  CartItemsResponse,
  ProductsResponse,
  ProductPricesResponse,
} from '../../../pocketbase-types.js';

export const actions = {
  createOrder: async ({ locals }) => {
    const cartItems = await locals.pb.collection('cart_items').getFullList<
      CartItemsResponse<{
        product_id: ProductsResponse<{
          product_prices_via_product_id: ProductPricesResponse[];
        }>;
      }>
    >({
      expand: 'product_id, product_id.product_prices_via_product_id',
    });

    /*
      status: 1 = pending
      status: 2 = paid
      status: 3 = canceled
    */

    if (cartItems.length === 0) {
      throw new Error('No hay productos en el carrito');
    }

    const totalAmount = cartItems.reduce((acc, item) => {
      const productPrices =
        item.expand?.product_id.expand?.product_prices_via_product_id;
      if (!productPrices) {
        throw new Error('El producto no existe');
      }

      const productPrice = productPrices.find((price) => {
        return price.is_active === true;
      });

      if (!productPrice) {
        throw new Error('El producto no tiene precio');
      }
      return acc + productPrice.price * item.quantity;
    }, 0);

    console.log(locals.user.id);
    console.log({ totalAmount });

    const insertedOrder = await locals.pb.collection('orders').create({
      total_amount: totalAmount,
      status: 1,
      user_id: locals.user.id,
      // just one day
      expiration_date: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    if (!insertedOrder) {
      throw new Error('Error al crear la orden');
    }

    for (const cartItem of cartItems) {
      const productPrices =
        cartItem.expand?.product_id.expand?.product_prices_via_product_id;
      if (!productPrices) {
        throw new Error('El producto no existe');
      }

      const productPrice = productPrices.find((price) => {
        return price.is_active === true;
      });

      if (!productPrice) {
        throw new Error('El producto no tiene precio');
      }

      await locals.pb.collection('order_items').create({
        product_id: cartItem.product_id,
        order_id: insertedOrder.id,
        quantity: cartItem.quantity,
        unit_price: productPrice.price,
      });

      await locals.pb.collection('cart_items').delete(cartItem.id);
    }

    redirect(303, '/carrito/pago');
  },
};

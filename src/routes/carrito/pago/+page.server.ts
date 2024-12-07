import { fail, redirect, type Actions } from '@sveltejs/kit';
import { valibot } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';
import * as v from 'valibot';
import type {
  OrderItemsResponse,
  OrdersResponse,
  ProductsResponse,
} from '../../../../pocketbase-types.js';
import { Preference } from 'mercadopago';
import { client } from '$lib/mercadopago.js';

export const load = async ({ locals }) => {
  const orders = await locals.pb.collection('orders').getList(1, 2, {
    sort: '-created',
  });

  if (orders.totalItems === 0) {
    redirect(303, '/carrito');
  }

  return {
    order: orders.items[0],
  };
};

const schema = v.object({
  orderItemId: v.pipe(v.string(), v.trim(), v.nonEmpty()),
});

export const actions: Actions = {
  incrementOrderItem: async ({ locals, request }) => {
    const form = await superValidate(request, valibot(schema));

    if (!form.valid) {
      return fail(500, { form });
    }

    const { data } = form;

    const orderItem = await locals.pb
      .collection('order_items')
      .getOne<OrderItemsResponse>(data.orderItemId);

    // await locals.pb.collection('order_items').update(data.orderItemId, {
    //   quantity: orderItem.quantity + 1,
    // });

    // a reducer function to calculate the total amount

    // await locals.pb.collection('orders').update('', {
    //   total_amount: 0, // TODO: calculate total amount
    // });
    // console.log('incrementOrderItem');

    return {};
  },
  decrementOrderItem: async ({ locals, request }) => {
    const form = await superValidate(request, valibot(schema));

    if (!form.valid) {
      return fail(500, { form });
    }

    const { data } = form;

    const orderItem = await locals.pb
      .collection('order_items')
      .getOne<OrderItemsResponse>(data.orderItemId);

    // await locals.pb.collection('order_items').update(data.orderItemId, {
    //   quantity: orderItem.quantity - 1,
    // });

    // a reducer function to calculate the total amount
    const orderItems = await locals.pb.collection('order_items').getList(1, 1, {
      // products, product_prices
      expand: 'product_id, product_prices',
    });

    // console.log(orderItems.items[0].expand.product_id);
    // const totalAmount = orderItems.reduce(
    //   (acc, item) => acc + item.quantity * item.price,
    //   0
    // );

    // await locals.pb.collection('orders').update('', {
    //   total_amount: 0, // TODO: calculate total amount
    // });

    return {};
  },

  createOrder: async ({ locals }) => {
    const order = await locals.pb.collection('orders').getFirstListItem<
      OrdersResponse<{
        order_items_via_order_id: OrderItemsResponse<{
          product_id: ProductsResponse;
        }>[];
      }>
    >('', {
      sort: '-created',
      // orders, products, product_prices
      expand: 'order_items_via_order_id, order_items_via_order_id.product_id',
    });

    if (!order.expand) {
      return fail(500, { message: 'No order found' });
    }

    const mappedItems = order.expand.order_items_via_order_id.map((item) => {
      if (!item.expand) {
        throw new Error('No product name found');
      }
      return {
        title: item.expand.product_id.name,
        quantity: item.quantity,
        currency_id: 'PEN',
        unit_price: item.unit_price,
        id: item.product_id,
        description: item.expand.product_id.description,
      };
    });

    const payment = new Preference(client);
    const preference = await payment.create({
      body: {
        items: mappedItems,
      },
    });

    if (!preference.init_point) {
      return fail(500, { message: 'No preference found' });
    }

    redirect(303, preference.init_point);
  },
};

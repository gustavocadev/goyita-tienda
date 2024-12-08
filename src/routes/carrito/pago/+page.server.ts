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
  const orders = await locals.pb.collection('orders').getList(0, 1, {
    sort: '-created',
    filter: 'status = 1',
  });

  if (orders.totalItems === 0) {
    redirect(303, '/carrito');
  }

  const [lastOrder] = orders.items;

  return {
    order: lastOrder,
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

    await locals.pb.collection('order_items').update(data.orderItemId, {
      quantity: orderItem.quantity + 1,
    });

    const orderItems = await locals.pb.collection('order_items').getList(1, 1, {
      sort: '-created',
      filter: 'status = 1',
    });

    if (orderItems.totalItems === 0) {
      return fail(500, { message: 'No order items found' });
    }

    const [lastOrderItem] = orderItems.items;

    // a reducer function to calculate the total amount
    const newTotalAmount = orderItems.items.reduce(
      (acc, item) => acc + item.quantity * item.unit_price,
      0
    );

    await locals.pb.collection('orders').update(lastOrderItem.order_id, {
      total_amount: newTotalAmount, // TODO: calculate total amount
    });

    console.log('incrementOrderItem');

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
      sort: '-created',
      filter: 'status = 1',
    });

    if (orderItems.totalItems === 0) {
      return fail(500, { message: 'No order items found' });
    }

    const [lastOrderItem] = orderItems.items;

    // console.log(orderItems.items[0].expand.product_id);
    const newTotalAmount = orderItems.items.reduce(
      (acc, item) => acc + item.quantity * item.unit_price,
      0
    );

    await locals.pb.collection('orders').update(lastOrderItem.order_id, {
      total_amount: newTotalAmount, // TODO: calculate total amount
    });

    return {};
  },

  createOrder: async ({ locals, url }) => {
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
        redirect_urls: {
          success: `${url.origin}/carrito/pago/confirmacion`,
        },
        back_urls: {
          success: `${url.origin}/carrito/pago/confirmacion`,
        },
      },
    });

    if (!preference.init_point) {
      return fail(500, { message: 'No preference found' });
    }

    redirect(303, preference.init_point);
  },
};

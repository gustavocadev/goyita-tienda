import type { ProductsResponse } from '../../../pocketbase-types.js';
import type { ProductPricesResponse } from '../../../pocketbase-types';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { valibot } from 'sveltekit-superforms/adapters';
import * as v from 'valibot';

export const load = async ({ locals }) => {
  const products = locals.pb.collection('products').getList<
    ProductsResponse<{
      product_prices_via_product_id?: ProductPricesResponse[];
    }>
  >(1, 4, {
    expand: 'product_prices_via_product_id',
  });

  return {
    products,
  };
};

const schema = v.object({
  productId: v.string(),
});

export const actions = {
  logout: async ({ locals }) => {
    locals.pb.authStore.clear();
    redirect(303, '/');
  },
  incrementItem: async ({ locals, request }) => {
    const form = await superValidate(request, valibot(schema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const { productId } = form.data;
    const cartItems = await locals.pb.collection('cart_items').getFullList({
      filter: `product_id = "${productId}"`,
    });

    if (cartItems.length === 0) {
      throw new Error('Cart item not found');
    }

    const [cartItem] = cartItems;

    await locals.pb.collection('cart_items').update(cartItem.id, {
      quantity: cartItem.quantity + 1,
    });

    return message(form, 'Producto incrementado');
  },

  decrementItem: async ({ locals, request }) => {
    const form = await superValidate(request, valibot(schema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const { productId } = form.data;

    const cartItems = await locals.pb.collection('cart_items').getFullList({
      filter: `product_id = "${productId}"`,
    });

    if (cartItems.length === 0) {
      throw new Error('Cart item not found');
    }

    const [cartItem] = cartItems;

    if (cartItem.quantity === 1) {
      await locals.pb.collection('cart_items').delete(cartItem.id);

      return message(form, 'Producto eliminado del carrito');
    }

    await locals.pb.collection('cart_items').update(cartItem.id, {
      quantity: cartItem.quantity - 1,
    });

    return message(form, 'Producto decrementado');
  },
};

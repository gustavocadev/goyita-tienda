import { fail, redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import type { TypedPocketBase } from '../../../pocketbase-types.js';

export const load = async ({ locals }) => {
  const isValidSession = locals.pb.authStore.isValid;
  if (isValidSession) {
    redirect(302, '/');
  }
  return {};
};

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  cartItems: z.string().transform((val) => {
    const parsedValue = JSON.parse(val) as {
      quantity: number;
      productId: string;
    }[];
    return parsedValue;
  }),
});

export const actions = {
  login: async ({ request, locals }) => {
    const form = await superValidate(request, zod(schema));

    if (!form.valid) {
      return fail(400, { form });
    }
    const { email, password, cartItems } = form.data;

    console.log(cartItems);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const authData = await locals.pb
        .collection('users')
        .authWithPassword(email, password);

      // verify if the user has a cart
      const userId = authData.record.id;

      const cart = await locals.pb.collection('cart').getFullList();
      if (cart.length === 0) {
        await createCartByUserId(locals.pb, userId);
      }

      // if my cart (from local storage) is not empty, create a cart for the user
      if (cartItems.length !== 0) {
        const cart = await locals.pb.collection('cart').getFullList();
        const [userCart] = cart;

        // search if the product is already in the cart(from db)
        const cartItemsFromDb = await locals.pb
          .collection('cart_items')
          .getFullList();

        for (const cartItem of cartItems) {
          const existsProductInDb = cartItemsFromDb.some(
            (cartItemFromDb) => cartItemFromDb.product_id === cartItem.productId
          );
          if (!existsProductInDb) {
            await locals.pb.collection('cart_items').create({
              product_id: cartItem.productId,
              cart_id: userCart.id,
              quantity: cartItem.quantity,
            });
          }
        }
      }
    } catch (error) {
      console.log({ error });
      return message(form, 'Invalid email or password');
    }
    redirect(303, '/');
  },
};

const createCartByUserId = (pb: TypedPocketBase, userId: string) => {
  return pb.collection('cart').create({
    user_id: userId,
  });
};

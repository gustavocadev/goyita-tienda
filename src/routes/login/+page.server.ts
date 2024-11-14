import { fail, redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

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

    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const authData = await locals.pb
        .collection('users')
        .authWithPassword(email, password);

      if (cartItems.length !== 0) {
        const userId = authData.record.id;
        const createdCart = await locals.pb.collection('cart').create({
          user_id: userId,
        });

        for (const cartItem of cartItems) {
          await locals.pb.collection('cart_items').create({
            product_id: cartItem.productId,
            cart_id: createdCart.id,
            quantity: cartItem.quantity,
          });
        }
      }
    } catch (error) {
      console.log({ error });
      return message(form, 'Invalid email or password');
    }
    redirect(303, '/');
  },
};

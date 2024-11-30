import { redirect } from '@sveltejs/kit';

export const actions = {
  createOrder: () => {
    // todo: create order
    redirect(303, '/carrito/pago');
  },
};

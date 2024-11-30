import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  const orders = await locals.pb.collection('orders').getFullList();
  if (orders.length === 0) {
    redirect(303, '/carrito');
  }

  return {};
};

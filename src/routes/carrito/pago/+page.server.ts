import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  const orders = await locals.pb.collection('orders').getList(1, 2, {
    sort: '-created',
  });

  if (orders.totalItems === 0) {
    redirect(303, '/carrito');
  }

  return {};
};

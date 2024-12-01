import { redirect } from '@sveltejs/kit';
import type {
  OrderItemsResponse,
  OrdersResponse,
  ProductsResponse,
} from '../../../pocketbase-types.js';

export const load = async ({ locals }) => {
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

  if (!locals.user) {
    redirect(303, '/login');
  }

  return {
    order,
  };
};

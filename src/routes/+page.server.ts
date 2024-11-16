import type { ProductsResponse } from '../../pocketbase-types.js';
import type { ProductPricesResponse } from '../../pocketbase-types';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, request, depends }) => {
  depends('filter:products');
  const url = new URL(request.url);
  const productName = url.searchParams.get('p');

  const products = locals.pb.collection('products').getFullList<
    ProductsResponse<{
      product_prices_via_product_id?: ProductPricesResponse[];
    }>
  >({
    expand: 'product_prices_via_product_id',
    filter: productName ? `name ~ "${productName}"` : '',
  });

  return {
    products,
  };
};

export const actions = {
  logout: async ({ locals }) => {
    locals.pb.authStore.clear();
    redirect(303, '/');
  },
  incrementItem: async ({ locals, params }) => {
    console.log('Hello from incrementItem');

    return {};
  },

  decrementItem: async ({ locals, params }) => {
    console.log('Hello from decrementItem');

    return {};
  },
};

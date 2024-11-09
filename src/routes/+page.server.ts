import type { ProductsResponse } from '../../pocketbase-types.js';
import type { ProductPricesResponse } from '../../pocketbase-types';

export const load = async ({ locals }) => {
  const products = locals.pb.collection('products').getFullList<
    ProductsResponse<{
      product_prices_via_product_id?: ProductPricesResponse[];
    }>
  >({
    expand: 'product_prices_via_product_id',
  });

  return {
    products,
  };
};

import type { ProductsResponse } from '../../pocketbase-types.js';
import type { ProductPricesResponse } from '../../pocketbase-types';

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

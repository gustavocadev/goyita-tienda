import type {
  ProductPricesResponse,
  ProductsResponse,
} from '../../../../pocketbase-types.js';

export const load = async ({ locals, request, depends }) => {
  depends('filter:products');
  const url = new URL(request.url);
  const productName = url.searchParams.get('p');

  const products = locals.pb.collection('products').getList<
    ProductsResponse<{
      product_prices_via_product_id?: ProductPricesResponse[];
    }>
  >(1, 9, {
    expand: 'product_prices_via_product_id',
    filter: productName ? `name ~ "${productName}"` : '',
  });

  return {
    products,
  };
};

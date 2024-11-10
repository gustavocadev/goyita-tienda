import type {
  ProductPricesRecord,
  ProductsResponse,
} from '../../../../pocketbase-types';

export const load = async ({ request, locals, params }) => {
  const { slug } = params;
  const product = await locals.pb.collection('products').getOne<
    ProductsResponse<{
      product_prices_via_product_id?: ProductPricesRecord[];
    }>
  >(slug, {
    expand: 'product_prices_via_product_id',
  });
  console.log({ product });
  return {
    product,
  };
};

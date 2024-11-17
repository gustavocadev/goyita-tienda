import type {
  ProductPricesRecord,
  ProductsResponse,
} from '../../../../pocketbase-types';

export const load = async ({ locals, params }) => {
  const { slug } = params;
  const product = await locals.pb.collection('products').getOne<
    ProductsResponse<{
      product_prices_via_product_id?: ProductPricesRecord[];
    }>
  >(slug, {
    expand: 'product_prices_via_product_id',
  });

  const productImages = product.img.map((img) => {
    return {
      url: locals.pb.files.getUrl(product, img),
    };
  });

  return {
    product,
    productImages,
  };
};

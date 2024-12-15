import type { Actions } from '@sveltejs/kit';
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
      url: locals.pb.files.getURL(product, img),
    };
  });

  return {
    product,
    productImages,
  };
};

export const actions: Actions = {
  addProductToCart: async ({ locals, params }) => {
    const productId = params.slug!;
    const product = await locals.pb.collection('products').getOne(productId);
    const cart = await locals.pb.collection('cart').getFullList();

    if (cart.length === 0) {
      throw new Error('No cart found');
    }

    const [cartFound] = cart;
    await locals.pb.collection('cart_items').create({
      product_id: product.id,
      cart_id: cartFound.id,
      quantity: 1,
    });

    return {};
  },
};

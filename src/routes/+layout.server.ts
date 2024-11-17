import type {
  CartItemsResponse,
  ProductsResponse,
} from '../../pocketbase-types.js';

export const load = async ({ locals }) => {
  const cartItems = await locals.pb.collection('cart_items').getFullList<
    CartItemsResponse<{
      product_id: ProductsResponse;
    }>
  >({
    expand: 'product_id',
  });

  const productPrices = await locals.pb
    .collection('product_prices')
    .getFullList();

  const cartItemsMapped = cartItems.map((cartItem) => {
    const productPrice = productPrices.find(
      (productPrice) => productPrice.product_id === cartItem.product_id
    );

    return {
      productId: cartItem.expand?.product_id.id!,
      quantity: cartItem.quantity,
      name: cartItem.expand?.product_id.name!,
      img: cartItem.expand?.product_id.img!,
      price: productPrice?.price!,
    };
  });

  return {
    user: locals.user,
    cartItems: cartItemsMapped,
  };
};

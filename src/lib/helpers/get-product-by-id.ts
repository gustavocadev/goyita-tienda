import { pb } from '$lib/pocketbase';

export const getProductById = async (id: string) => {
  const product = await pb.collection('products').getOne(id);
  return product;
};

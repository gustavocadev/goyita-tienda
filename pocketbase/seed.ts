import Pocketbase from 'pocketbase';
import { TypedPocketBase } from '../pocketbase-types';
import { products } from './data/products';

const PUBLIC_POCKETBASE_URL = Bun.env.PUBLIC_POCKETBASE_URL;

const generateRandomPrice = () => Math.floor(Math.random() * 100) + 1;

async function seed() {
  const pb = new Pocketbase(PUBLIC_POCKETBASE_URL) as TypedPocketBase;

  for (const product of products) {
    // Login as admin
    await pb.admins.authWithPassword('gustavocadev@gmail.com', 'gustavocadev&');

    // delete the product if it already exists

    // then create the product and its price
    const { id } = await pb.collection('products').create(product);
    await pb.collection('product_prices').create({
      product_id: id,
      price: generateRandomPrice(),
      is_active: true,
    });
  }
}

seed();

<script lang="ts">
  import type { ProductCart } from '$lib/context/cart.svelte';
  import { getProductById } from '$lib/helpers/get-product-by-id';
  import { pb } from '$lib/pocketbase';
  import ProductCounter from './product-counter.svelte';
  import Skeleton from './ui/skeleton/skeleton.svelte';

  type Props = {
    cartProduct: ProductCart;
    orderItemId?: string;
  };

  let { cartProduct, orderItemId }: Props = $props();
</script>

<div class="flex items-center gap-2">
  {#await getProductById(cartProduct.productId)}
    <Skeleton class="" />
  {:then product}
    <img
      src={product.img.length > 0
        ? pb.files.getURL(product, product.img[0])
        : 'https://via.placeholder.com/68x68'}
      alt="Product Thumbnail"
      width={64}
      height={64}
      class="rounded-lg object-cover"
    />
  {:catch error}
    <img
      src="https://via.placeholder.com/68x68"
      alt="Product Thumbnail"
      width={68}
      height={68}
      class="rounded-lg object-cover"
    />
  {/await}
  <div class="flex-1 space-y-1">
    <h3 class="font-semibold text-base">{cartProduct.name}</h3>
    <ProductCounter {cartProduct} {orderItemId} />
  </div>

  <div class="text-right">
    <p class="font-medium">S/{cartProduct.price} SOL</p>
  </div>
</div>

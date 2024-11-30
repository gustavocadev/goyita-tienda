<script lang="ts">
  import type { ProductCart } from '$lib/context/cart.svelte';
  import ProductCounter from './product-counter.svelte';

  type Props = {
    cartProduct: ProductCart;
  };

  let { cartProduct }: Props = $props();
</script>

<div class="flex items-center gap-2">
  <img
    src={cartProduct.img[0]}
    alt="Product Thumbnail"
    width={120}
    height={68}
    class="rounded-lg object-cover"
  />
  <div class="flex-1">
    <h3 class="font-semibold text-base">{cartProduct.name}</h3>
    <ProductCounter {cartProduct} />
  </div>

  <div class="text-right">
    <p class="font-medium">S/{cartProduct.price} SOL</p>
  </div>
</div>

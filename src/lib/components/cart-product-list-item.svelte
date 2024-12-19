<script lang="ts">
  import type { ProductCart } from '$lib/context/cart.svelte';
  import { getProductById } from '$lib/helpers/get-product-by-id';
  import { pb } from '$lib/pocketbase';
  import ProductCounter from './product-counter.svelte';
  import Skeleton from './ui/skeleton/skeleton.svelte';

  interface Props {
    cartProduct: ProductCart;
  }

  let { cartProduct }: Props = $props();
</script>

<div
  class="flex gap-3 pb-4 border-b mt-4"
  class:hidden={cartProduct.quantity === 0}
>
  <figure class="relative h-16 w-16 overflow-hidden rounded">
    {#await getProductById(cartProduct.productId)}
      <Skeleton class="w-full h-full" />
    {:then product}
      <img
        src={cartProduct.img.length > 0
          ? pb.files.getURL(product, product.img[0])
          : null}
        alt="Imagen del producto"
        width={64}
        height={64}
        class="object-cover"
      />
    {:catch error}
      <img
        src="https://placehold.co/500"
        alt="Imagen del producto"
        width={64}
        height={64}
        class="object-cover"
      />
    {/await}
  </figure>
  <div class="flex flex-1 flex-col justify-between">
    <div>
      <h3 class="font-medium">{cartProduct.name}</h3>
      <!-- <p class="text-sm">Negro / XS</p> -->
    </div>
    <div class="flex items-center justify-between">
      <span class="font-medium">S/. {cartProduct.price}</span>
      <ProductCounter {cartProduct} />
    </div>
  </div>
</div>

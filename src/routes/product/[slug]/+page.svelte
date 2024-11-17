<script lang="ts">
  import { enhance } from '$app/forms';
  import ProductCarousel from '$lib/components/product-carousel.svelte';
  import Badge from '$lib/components/ui/badge/badge.svelte';
  import { Button } from '$lib/components/ui/button';
  import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
  import { getCartContext } from '$lib/context/cart.svelte.js';
  import { pb } from '$lib/pocketbase.js';

  let { data } = $props();

  const {
    addCartItem,
    toggleCartSheet,
    cartItems,
    isCartItemsLoading,
    isUserLoggedIn,
  } = getCartContext();

  const colors = [
    { id: 'black', name: 'Black' },
    { id: 'white', name: 'White' },
    { id: 'blue', name: 'Blue' },
  ];

  const images = [
    '/placeholder.svg?height=600&width=600',
    '/placeholder.svg?height=600&width=600',
    '/placeholder.svg?height=600&width=600',
  ];

  const existsProduct = $derived(
    cartItems.value.some((cartItem) => cartItem.productId === data.product.id),
  );

  const addProductToCart = () => {
    if (existsProduct) return;

    if (!data.product.expand?.product_prices_via_product_id) return;

    const productPrice =
      data.product.expand?.product_prices_via_product_id[0].price;

    addCartItem({
      productId: data.product.id,
      name: data.product.name,
      price: productPrice,
      quantity: 1,
      img: [pb.files.getUrl(data.product, data.product.img[0])],
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems.value));
    toggleCartSheet();
  };
</script>

<div class="grid lg:grid-cols-2 gap-8">
  <div>
    <ProductCarousel images={data.productImages} />
  </div>

  <div class="flex flex-col">
    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
      {data.product.name}
    </h1>

    <div class="inline-flex items-start py-1 rounded-full w-fit mb-8">
      {#if data.product.expand?.product_prices_via_product_id}
        <Badge>
          S/. {data.product.expand?.product_prices_via_product_id[0]
            .price}</Badge
        >
      {:else}
        <Badge>./ No disponible</Badge>
      {/if}
    </div>

    <!-- <div class="mb-6">
      <h2 class="text-gray-900 dark:text-white text-sm font-medium mb-3">
        COLOR
      </h2>
      <div class="flex gap-2">
        {#each colors as color}
          <button
            type="button"
            class="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-700"
            style="background-color: {color.id}"
          >
            <span class="sr-only">{color.name}</span>
          </button>
        {/each}
      </div>
    </div> -->
    <!-- 
    <div class="mb-8">
      <h2 class="text-gray-900 dark:text-white text-sm font-medium mb-3">
        TALLA
      </h2>
      <div class="flex flex-wrap gap-2">
        <span>XS</span>
      </div>
    </div> -->

    <p class="text-gray-700 dark:text-gray-300 text-sm mb-8">
      {data.product.description}
    </p>

    {#if data.product.expand?.product_prices_via_product_id && !isCartItemsLoading.value}
      <!-- <p>
      {data.product.expand?.product_prices_via_product_id[0].price}
    </p> -->
      <form
        action="?/addProductToCart"
        method="post"
        use:enhance
        class="w-full"
      >
        <Button
          type={isUserLoggedIn.value ? 'submit' : 'button'}
          variant={existsProduct ? 'outline' : 'default'}
          class="w-full"
          onclick={() => {
            if (!isUserLoggedIn.value) {
              addProductToCart();
              return;
            }
          }}
        >
          {#if existsProduct}
            Agregado al carrito
          {:else}
            Comprar ahora
          {/if}
          <!-- <Plus class="h-5 w-5" /> -->
        </Button>
      </form>
    {:else}
      <Skeleton class="w-full h-10" />
    {/if}
  </div>
</div>

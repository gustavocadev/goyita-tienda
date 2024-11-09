<script lang="ts">
  import { products } from '$lib/data/products';
  import CartSheet from '$lib/components/cart-sheet.svelte';
</script>

<main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <h2 class="text-3xl font-bold text-gray-900">Home</h2>
  <p class="mt-1 text-sm text-gray-500">Todos los productos</p>

  <div
    class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
  >
    {#each products as product}
      <div class="group relative">
        <div
          class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none"
        >
          <img
            src={product.imageSrc}
            alt={product.imageAlt}
            class="w-full h-full object-center object-cover lg:w-full lg:h-full"
            width={500}
            height={500}
          />
        </div>
        <div class="mt-4 flex justify-between">
          <div>
            <h3 class="text-sm text-gray-700">
              <a href="/product/produt-name">
                <span aria-hidden="true" class="absolute inset-0"></span>
                {product.name}
              </a>
            </h3>
          </div>
          <p class="text-sm font-medium text-gray-900">{product.price}</p>
        </div>
      </div>
    {/each}
  </div>
</main>

<CartSheet />

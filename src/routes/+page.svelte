<script lang="ts">
  import { Skeleton } from '$lib/components/ui/skeleton';
  import { pb } from '$lib/pocketbase';

  let { data } = $props();

  const skeletonArr = Array.from({ length: 8 });
</script>

<h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100">Home</h2>
<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Todos los productos</p>

<div
  class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
>
  {#await data.products}
    {#each skeletonArr as skeleton}
      <Skeleton class="w-full h-[320px]" />
    {/each}
  {:then products}
    {#each products as product}
      <div class="group relative">
        <figure
          class="w-full min-h-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none"
        >
          <img
            src={product.img.length > 0
              ? pb.files.getURL(product, product.img[0])
              : 'https://placehold.co/500'}
            alt={product.description}
            class="w-full h-full object-center object-cover lg:w-full lg:h-full"
          />
        </figure>
        <div class="mt-4 flex justify-between">
          <div>
            <h3 class="text-sm text-gray-700 dark:text-gray-300">
              <a href={`/product/${product.id}`}>
                <span aria-hidden="true" class="absolute inset-0"></span>
                {product.name}
              </a>
            </h3>
          </div>
          <p
            class="text-sm font-medium text-gray-900 dark:text-gray-200
          "
          >
            {#if product.expand?.product_prices_via_product_id}
              S/. {product.expand?.product_prices_via_product_id[0].price}
            {:else}
              No esta disponible
            {/if}
          </p>
        </div>
      </div>
    {/each}
  {/await}
</div>

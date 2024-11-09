<script lang="ts">
  import { Skeleton } from '$lib/components/ui/skeleton';

  let { data } = $props();

  const skeletonArr = Array.from({ length: 8 });
</script>

<h2 class="text-3xl font-bold text-gray-900">Home</h2>
<p class="mt-1 text-sm text-gray-500">Todos los productos</p>

<div
  class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
>
  {#await data.products}
    {#each skeletonArr as skeleton}
      <Skeleton class="w-full h-[320px]" />
    {/each}
  {:then products}
    {#each products as product, idx}
      <div class="group relative">
        <figure
          class="w-full min-h-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none"
        >
          <img
            src={`https://placedog.net/50${idx}`}
            alt={product.description}
            class="w-full h-full object-center object-cover lg:w-full lg:h-full"
          />
        </figure>
        <div class="mt-4 flex justify-between">
          <div>
            <h3 class="text-sm text-gray-700">
              <a href="/product/produt-name">
                <span aria-hidden="true" class="absolute inset-0"></span>
                {product.name}
              </a>
            </h3>
          </div>
          <p class="text-sm font-medium text-gray-900">
            S/. {product.expand?.product_prices_via_product_id[0].price}
          </p>
        </div>
      </div>
    {/each}
  {/await}
</div>

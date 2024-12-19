<script lang="ts">
  import ProductCard from '$lib/components/product-card.svelte';
  import { Skeleton } from '$lib/components/ui/skeleton';
  import { pb } from '$lib/pocketbase';
  import { MetaTags } from 'svelte-meta-tags';

  let { data } = $props();

  const skeletonArr = Array.from({ length: 8 });
</script>

<h2 class="text-3xl font-bold text-primary mb-8">Productos destacados</h2>

<MetaTags
  title="Goyita Store"
  description="Descubre los productos destacados"
  keywords={['productos', 'tienda', 'comprar']}
/>
<div
  class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
>
  {#await data.products}
    {#each skeletonArr as skeleton}
      <Skeleton class="w-full h-[320px]" />
    {/each}
  {:then products}
    {#each products.items as product}
      <ProductCard
        product={{
          id: product.id,
          name: product.name,
          description: product.description,
          img:
            product.img.length > 0
              ? pb.files.getURL(product, product.img[0])
              : 'https://placehold.co/500',
          price: product.expand?.product_prices_via_product_id?.[0].price,
        }}
      />
    {/each}
  {/await}
</div>

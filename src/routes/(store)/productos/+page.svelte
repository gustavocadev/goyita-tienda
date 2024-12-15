<script lang="ts">
  import ProductCard from '$lib/components/product-card.svelte';
  import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
  import { pb } from '$lib/pocketbase.js';
  import { MetaTags } from 'svelte-meta-tags';

  let { data } = $props();

  const skeletonArr = Array.from({ length: 9 });
</script>

<MetaTags
  title="Todos los productos"
  description="Descubre todos los productos disponibles"
  keywords={['productos', 'tienda', 'comprar']}
/>
<h1 class="text-4xl font-bold text-primary mb-8">Todos los productos</h1>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
          price: product.expand?.product_prices_via_product_id
            ? product.expand?.product_prices_via_product_id[0].price
            : undefined,
        }}
      />
    {/each}
  {/await}
</div>

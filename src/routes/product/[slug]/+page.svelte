<script lang="ts">
  import ProductCarousel from '$lib/components/product-carousel.svelte';
  import Badge from '$lib/components/ui/badge/badge.svelte';
  import { Button } from '$lib/components/ui/button';
  import { ChevronLeft, ChevronRight, Plus } from 'lucide-svelte';

  let { data } = $props();

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

  const nextImage = () => {
    // setCurrentImageIndex((prev) => (prev + 1) % images.length)
  };

  const previousImage = () => {
    // setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  };
</script>

<div class="grid lg:grid-cols-2 gap-8">
  <div>
    <ProductCarousel />
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

    <Button type="button">
      <Plus class="h-5 w-5" />
      Añadir al carrito
    </Button>
  </div>
</div>

<div class="mt-8 flex gap-4">
  <!-- Aquí puedes mapear las miniaturas de imágenes -->
</div>

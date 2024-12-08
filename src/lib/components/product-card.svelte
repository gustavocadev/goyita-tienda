<script lang="ts">
  import { pb } from '$lib/pocketbase';

  type Props = {
    product: {
      id: string;
      name: string;
      img: string;
      description: string;
      price?: number;
    };
  };
  let { product }: Props = $props();
</script>

<div class="group relative">
  <figure
    class="w-full min-h-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none"
  >
    <img
      src={product.img}
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
      {#if product.price}
        S/. {product.price}
      {:else}
        No esta disponible
      {/if}
    </p>
  </div>
</div>

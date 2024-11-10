<script lang="ts">
  import { type CarouselAPI } from '$lib/components/ui/carousel/context.js';
  import * as Carousel from '$lib/components/ui/carousel/index.js';
  import { ArrowLeft, ArrowRight } from 'lucide-svelte';
  import { Button } from './ui/button';

  let api = $state<CarouselAPI>();
  let current = $state(0);
  const count = $derived(api ? api.scrollSnapList().length : 0);

  $effect(() => {
    if (api) {
      current = api.selectedScrollSnap() + 1;
      api.on('select', () => {
        current = api!.selectedScrollSnap() + 1;
      });
    }
  });
</script>

<Carousel.Root class="w-full" setApi={(emblaApi) => (api = emblaApi)}>
  <Carousel.Content>
    {#each Array(3) as _, i (i)}
      <Carousel.Item>
        <img
          src={`https://picsum.photos/seed/${i + 3}/800/600`}
          class="w-full h-full object-cover rounded-md"
          alt="Product image"
        />
      </Carousel.Item>
    {/each}
  </Carousel.Content>
  <div class="flex gap-3 justify-center pt-4">
    <Button
      onclick={() => api?.scrollPrev()}
      class="rounded-full"
      variant="outline"
      size="icon"
      disabled={current === 1}
    >
      <ArrowLeft />
    </Button>
    <Button
      onclick={() => api?.scrollNext()}
      class="rounded-full"
      variant="outline"
      size="icon"
      disabled={current === count}
    >
      <ArrowRight />
    </Button>
  </div>
</Carousel.Root>

<div class="mt-8 flex gap-4 justify-center">
  {#each Array(3) as image, idx}
    <button
      onclick={() => {
        api?.scrollTo(idx);
      }}
      class={`relative aspect-square w-24 rounded-lg overflow-hidden ${current - 1 === idx ? 'ring-2 ring-blue-600' : ''}`}
    >
      <img
        src={`https://picsum.photos/seed/${idx + 3}/800/600`}
        alt={`Product thumbnail ${idx + 1}`}
        class="object-cover"
      />
    </button>
  {/each}
</div>

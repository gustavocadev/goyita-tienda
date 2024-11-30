<script lang="ts">
  import { enhance } from '$app/forms';
  import { Button } from '$lib/components/ui/button';
  import { Card, CardContent } from '$lib/components/ui/card';
  import { getCartContext } from '$lib/context/cart.svelte';
  import { CircleIcon } from 'lucide-svelte';

  let { getTotalAmount, cartItems } = getCartContext();
</script>

<Card class="row-span-1">
  <CardContent
    class="p-6 space-y-4 flex justify-center items-center flex-col h-full"
  >
    <div class="flex items-center gap-2 text-sm text-muted-foreground">
      <CircleIcon class="size-4" />
      <span>{cartItems.value.length} Productos</span>
    </div>
    <div class="flex justify-between items-center">
      <span class="text-4xl font-bold">S/{getTotalAmount()}</span>
    </div>
    <form action="?/createOrder" method="post" use:enhance>
      <Button class="w-full" size="lg" type="submit"
        >Voy a comprar para mí 🛒</Button
      >
    </form>
  </CardContent>
</Card>

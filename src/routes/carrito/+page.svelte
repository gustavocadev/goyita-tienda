<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Card, CardContent } from '$lib/components/ui/card';
  import { getCartContext } from '$lib/context/cart.svelte';
  import { CircleIcon } from 'lucide-svelte';

  let { getTotalAmount, cartItems } = getCartContext();
</script>

<Card>
  <CardContent class="p-6 space-y-4">
    <div class="flex items-center gap-2 text-sm text-muted-foreground">
      <CircleIcon class="h-4 w-4" />
      <span>{cartItems.value.length} Productos</span>
    </div>
    <div class="flex justify-between items-center">
      <span class="text-4xl font-bold">S/{getTotalAmount()}</span>
      <div class="flex items-center gap-1 text-sm">
        <span>PEN</span>
        <CircleIcon class="h-4 w-4" />
      </div>
    </div>
    <Button class="w-full" size="lg">Voy a comprar para mí</Button>
  </CardContent>
</Card>

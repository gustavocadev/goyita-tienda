<script lang="ts">
  import CartItemCard from '$lib/components/cart-item-card.svelte';
  import { Card, CardContent } from '$lib/components/ui/card';
  import { getCartContext } from '$lib/context/cart.svelte';
  import { CircleIcon, ShoppingCartIcon } from 'lucide-svelte';

  let { children } = $props();

  let { cartItems, totalAmount } = getCartContext();
</script>

<div class="min-h-screen bg-background p-8">
  <div class="mx-auto max-w-6xl space-y-10">
    <h1 class="text-4xl font-bold">Resumen de tu pedido</h1>

    <div class="flex items-center justify-between">
      <div class="flex flex-col items-center gap-2">
        <div
          class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
        >
          <ShoppingCartIcon class="h-4 w-4" />
        </div>
        <span class="text-sm text-primary">Carrito</span>
      </div>
      <div class="h-px flex-1 bg-border mx-2" />
      <div class="flex flex-col items-center gap-2">
        <div
          class="flex h-8 w-8 items-center justify-center rounded-full border border-border"
        >
          <CircleIcon class="h-4 w-4" />
        </div>
        <span class="text-sm text-muted-foreground">Pago</span>
      </div>
      <div class="h-px flex-1 bg-border mx-2" />
      <div class="flex flex-col items-center gap-2">
        <div
          class="flex h-8 w-8 items-center justify-center rounded-full border border-border"
        >
          <CircleIcon class="h-4 w-4" />
        </div>
        <span class="text-sm text-muted-foreground">Confirmado</span>
      </div>
    </div>

    <div class="gap-6 lg:grid-cols-2 grid">
      <Card>
        <CardContent class="p-6">
          <h2 class="text-xl font-semibold mb-4">Resumen de tu pedido</h2>
          {#each cartItems() as cartItem}
            <CartItemCard
              productTitle={cartItem.name}
              productPrice={cartItem.price}
              productImg={cartItem.img}
            />
          {/each}
          <div class="mt-4 text-sm">
            <button class="text-primary">¿Necesitas ayuda con tu compra?</button
            >
          </div>
          <div class="mt-4 flex justify-between border-t pt-4">
            <span class="font-medium">Total</span>
            <span class="font-medium">S/{totalAmount()} SOL</span>
          </div>
        </CardContent>
      </Card>

      {@render children()}
    </div>
  </div>
</div>

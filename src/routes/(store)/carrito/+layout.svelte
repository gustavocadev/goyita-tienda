<script lang="ts">
  import { page } from '$app/stores';
  import CartItemCard from '$lib/components/cart-item-card.svelte';
  import { Card, CardContent } from '$lib/components/ui/card';
  import { getCartContext } from '$lib/context/cart.svelte';
  import { getProductById } from '$lib/helpers/get-product-by-id.js';
  import { pb } from '$lib/pocketbase.js';
  import { ShoppingCartIcon, Trophy, Wallet } from 'lucide-svelte';

  let { children, data } = $props();

  let { cartItems, getTotalAmount } = getCartContext();

  const totalOrderAmount = $derived(
    data.order?.expand?.order_items_via_order_id.reduce((acc, orderItem) => {
      return acc + orderItem.unit_price * orderItem.quantity;
    }, 0),
  );
</script>

{#if ($page.url.pathname === '/carrito' && data.cartItems.length > 0) || ($page.url.pathname === '/carrito/pago' && data.order) || $page.url.pathname === '/carrito/pago/confirmacion'}
  <div class="min-h-screen bg-background p-8">
    <div class="mx-auto max-w-6xl space-y-10">
      <h1 class="text-4xl font-bold">Resumen de tu pedido</h1>

      <div class="flex items-center justify-between">
        <div class="flex flex-col items-center gap-2">
          <div
            class="flex h-8 w-8 items-center justify-center rounded-full"
            class:bg-primary={$page.url.pathname === '/carrito'}
            class:text-primary-foreground={$page.url.pathname === '/carrito'}
          >
            <ShoppingCartIcon class="h-4 w-4" />
          </div>
          <span class="text-sm text-primary">Carrito</span>
        </div>
        <div class="h-px flex-1 bg-border mx-2" />
        <div class="flex flex-col items-center gap-2">
          <div
            class="flex h-8 w-8 items-center justify-center rounded-full border border-border"
            class:bg-primary={$page.url.pathname === '/carrito/pago'}
            class:text-primary-foreground={$page.url.pathname ===
              '/carrito/pago'}
          >
            <Wallet class="h-4 w-4" />
          </div>
          <span class="text-sm text-muted-foreground">Pago</span>
        </div>
        <div class="h-px flex-1 bg-border mx-2" />
        <div class="flex flex-col items-center gap-2">
          <div
            class="flex h-8 w-8 items-center justify-center rounded-full border border-border"
            class:bg-primary={$page.url.pathname ===
              '/carrito/pago/confirmacion'}
            class:text-primary-foreground={$page.url.pathname ===
              '/carrito/pago/confirmacion'}
          >
            <Trophy class="h-4 w-4" />
          </div>
          <span class="text-sm text-muted-foreground">Confirmado</span>
        </div>
      </div>

      <div
        class="gap-6 lg:grid-cols-2 lg:grid-rows-3 grid"
        class:lg:grid-cols-1={$page.url.pathname ===
          '/carrito/pago/confirmacion'}
      >
        {#if $page.url.pathname !== '/carrito/pago/confirmacion'}
          <Card class="row-span-2">
            <CardContent class="p-6">
              <h2 class="text-xl font-semibold mb-4">Resumen de tu pedido</h2>

              <div class="space-y-2">
                {#if $page.url.pathname === '/carrito'}
                  {#each cartItems.value as cartItem}
                    <CartItemCard cartProduct={cartItem} />
                  {/each}
                {:else if $page.url.pathname === '/carrito/pago' && data.order && data.order.expand?.order_items_via_order_id}
                  {#each data.order.expand?.order_items_via_order_id as orderItem}
                    <CartItemCard
                      cartProduct={{
                        img: orderItem.expand?.product_id.img ?? [],
                        name: orderItem.expand?.product_id.name ?? '',
                        price: orderItem.unit_price * orderItem.quantity,
                        productId: orderItem.product_id,
                        quantity: orderItem.quantity,
                      }}
                      orderItemId={orderItem.id}
                    />
                  {/each}
                {/if}
              </div>
              <div class="mt-4 text-sm">
                <button class="text-primary"
                  >¿Necesitas ayuda con tu compra?</button
                >
              </div>
              <div class="mt-4 flex justify-between border-t pt-4">
                <span class="font-medium">Total</span>
                <span
                  class="text-green-600 dark:text-green-400 font-semibold text-lg"
                  >S/
                  {#if $page.url.pathname === '/carrito'}
                    {getTotalAmount()}
                  {:else if $page.url.pathname === '/carrito/pago'}
                    {totalOrderAmount}
                  {/if}
                  SOL</span
                >
              </div>
            </CardContent>
          </Card>
        {/if}

        {@render children()}
      </div>
    </div>
  </div>
{:else}
  {@render children()}
{/if}

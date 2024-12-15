<script lang="ts">
  import { ShoppingCart, WalletMinimal } from 'lucide-svelte';
  import { Button } from './ui/button';
  import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
  import { getCartContext } from '$lib/context/cart.svelte';
  import { goto } from '$app/navigation';
  import ProductCounter from './product-counter.svelte';

  let isLoading = $state(false);

  let {
    setOpenCartSheet,
    isOpenCartSheet,
    cartItems,
    toggleCartSheet,
    getTotalAmount,
  } = getCartContext();
</script>

<Sheet
  open={isOpenCartSheet.value}
  onOpenChange={(value) => {
    setOpenCartSheet(value);
  }}
>
  <SheetContent class="w-[360px] sm:max-w-[360px] p-0 h-full">
    <SheetHeader class="p-4 pb-0">
      <div class="flex items-center justify-between">
        <SheetTitle class="text-xl">Mi Carrito</SheetTitle>
      </div>
    </SheetHeader>
    <div class="flex flex-col h-full">
      <div class="flex-1 overflow-auto p-4">
        {#each cartItems.value as cartProduct}
          <div
            class="flex gap-3 pb-4 border-b mt-4"
            class:hidden={cartProduct.quantity === 0}
          >
            <figure class="relative h-16 w-16 overflow-hidden rounded">
              <img
                src={cartProduct.img.length > 0
                  ? cartProduct.img[0]
                  : 'https://placehold.co/500'}
                alt="Imagen del producto"
                width={64}
                height={64}
                class="object-cover"
              />
            </figure>
            <div class="flex flex-1 flex-col justify-between">
              <div>
                <h3 class="font-medium">{cartProduct.name}</h3>
                <!-- <p class="text-sm">Negro / XS</p> -->
              </div>
              <div class="flex items-center justify-between">
                <span class="font-medium">S/. {cartProduct.price}</span>
                <ProductCounter {cartProduct} />
              </div>
            </div>
          </div>
        {:else}
          <div
            class="flex flex-col items-center justify-center h-full text-center"
          >
            <ShoppingCart class="h-12 w-12 text-muted-foreground mb-4" />
            <p class="text-lg font-semibold text-muted-foreground">
              Tu carrito está vacío
            </p>
          </div>
        {/each}
      </div>
      <div class="border-t p-4 mb-12">
        <div class="space-y-3">
          <!-- <div class="flex justify-between text-sm">
            <span>Impuestos</span>
            <span>$0.00 USD</span>
          </div>
          <div class="flex justify-between text-sm">
            <span>Envío</span>
            <span>Calculado al finalizar</span>
          </div> -->
          <div class="flex justify-between font-medium">
            <span>Total ({cartItems.value.length} productos)</span>
            <span>S/.{getTotalAmount()}</span>
          </div>

          <Button
            class="w-full"
            disabled={isLoading}
            onclick={async () => {
              isLoading = true;
              await goto('/carrito');
              isLoading = false;
              toggleCartSheet();
            }}
          >
            Completa tu compra!
            <WalletMinimal />
          </Button>
        </div>
      </div>
    </div>
  </SheetContent>
</Sheet>

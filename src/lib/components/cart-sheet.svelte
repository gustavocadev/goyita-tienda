<script lang="ts">
  import {
    Minus,
    Plus,
    Wallet,
    Wallet2,
    Wallet2Icon,
    WalletMinimal,
  } from 'lucide-svelte';
  import { Button } from './ui/button';
  import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
  import { getCartContext } from '$lib/context/cart.svelte';
  import { onMount } from 'svelte';

  let {
    decrementQuantity,
    incrementQuantity,
    setOpenCartSheet,
    isOpenCartSheet,
    cartItems,
    removeCartItem,
    setCartItems,
  } = getCartContext();

  onMount(() => {
    const cartProductItems = localStorage.getItem('cartItems');
    if (cartProductItems) {
      setCartItems(JSON.parse(cartProductItems));
    }
  });

  const productTotal = $derived(
    cartItems().reduce((acc, cartItem) => {
      return acc + cartItem.price * cartItem.quantity;
    }, 0),
  );
</script>

<Sheet
  open={isOpenCartSheet()}
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
        {#each cartItems() as cartProduct}
          <div class="flex gap-3 pb-4 border-b mt-4">
            <figure class="relative h-16 w-16 overflow-hidden rounded">
              <img
                src={cartProduct.img}
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
                <div class="flex items-center gap-3 bg-white/5 rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    class="h-8 w-8"
                    onclick={() => {
                      if (cartProduct.quantity === 1) {
                        removeCartItem(cartProduct.id);
                        return;
                      }

                      decrementQuantity(cartProduct.id);
                    }}
                  >
                    <Minus class="h-3 w-3" />
                  </Button>
                  <span class="w-4 text-center">{cartProduct.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    class="h-8 w-8"
                    onclick={() => incrementQuantity(cartProduct.id)}
                  >
                    <Plus class="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
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
            <span>Total ({cartItems().length} productos)</span>
            <span>S/.{productTotal}</span>
          </div>
          <Button class="w-full ">
            Completa tu compra!
            <WalletMinimal />
          </Button>
        </div>
      </div>
    </div>
  </SheetContent>
</Sheet>

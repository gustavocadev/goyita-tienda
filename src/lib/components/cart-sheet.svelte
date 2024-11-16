<script lang="ts">
  import { Minus, Plus, WalletMinimal } from 'lucide-svelte';
  import { Button } from './ui/button';
  import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
  import { getCartContext } from '$lib/context/cart.svelte';
  import type { UsersResponse } from '../../../pocketbase-types';
  import { goto } from '$app/navigation';
  import { applyAction, enhance } from '$app/forms';
  import type { SubmitFunction } from '@sveltejs/kit';

  type Props = {
    user: UsersResponse;
  };

  let { user }: Props = $props();

  let isLoading = $state(false);

  let {
    decrementQuantity,
    incrementQuantity,
    setOpenCartSheet,
    isOpenCartSheet,
    cartItems,
    removeCartItem,
    toggleCartSheet,
    isUserLoggedIn,
    totalAmount,
  } = getCartContext();

  const handleIncrementSubmit: SubmitFunction = ({ formData }) => {
    const productId = formData.get('productId') as string;
    incrementQuantity(productId);

    return async ({ result }) => {
      applyAction(result);
    };
  };

  const handleDecrementSubmit: SubmitFunction = ({ formData }) => {
    const productId = formData.get('productId') as string;

    console.log({ productId });
    const cartProduct = cartItems().find(
      (item) => item.productId === productId,
    );
    if (cartProduct!.quantity === 1) {
      removeCartItem(productId);
      return;
    }

    decrementQuantity(productId);
    return async ({ result }) => {
      applyAction(result);
    };
  };
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
                  <form
                    method="post"
                    use:enhance={handleDecrementSubmit}
                    action={isUserLoggedIn() ? '/?/decrementItem' : undefined}
                  >
                    <input
                      type="hidden"
                      name="productId"
                      value={cartProduct.productId}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      class="h-8 w-8"
                      type="submit"
                    >
                      <Minus class="h-3 w-3" />
                    </Button>
                  </form>
                  <span class="w-4 text-center">{cartProduct.quantity}</span>
                  <form
                    action={isUserLoggedIn() ? '/?/decrementItem' : undefined}
                    method="post"
                    use:enhance={handleIncrementSubmit}
                  >
                    <input
                      type="hidden"
                      name="productId"
                      value={cartProduct.productId}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      class="h-8 w-8"
                      type="submit"
                    >
                      <Plus class="h-3 w-3" />
                    </Button>
                  </form>
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
            <span>S/.{totalAmount()}</span>
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

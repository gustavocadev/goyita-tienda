<script lang="ts">
  import { Minus, Plus } from 'lucide-svelte';
  import { Button } from './ui/button';
  import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
  import { getCartContext } from '$lib/context/cart.svelte';

  let {
    decrementQuantity,
    incrementQuantity,
    quantityCartSheet,
    setOpenCartSheet,
    isOpenCartSheet,
  } = getCartContext();

  let cartProducts = $state([
    {
      id: 1,
      title: 'Título del Producto',
      price: 15.0,
      image: 'https://placehold.co/64x64',
    },
    {
      id: 2,
      title: 'Título del Producto',
      price: 15.0,
      image: 'https://placehold.co/64x64',
    },
  ]);
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
        {#each cartProducts as cartProduct}
          <div class="flex gap-3 pb-4 border-b mt-4">
            <figure class="relative h-16 w-16 overflow-hidden rounded">
              <img
                src="https://placehold.co/64x64"
                alt="Imagen del producto"
                width={64}
                height={64}
                class="object-cover"
              />
            </figure>
            <div class="flex flex-1 flex-col justify-between">
              <div>
                <h3 class="font-medium">Título del Producto</h3>
                <p class="text-sm">Negro / XS</p>
              </div>
              <div class="flex items-center justify-between">
                <span class="font-medium">$15.00 USD</span>
                <div class="flex items-center gap-3 bg-white/5 rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    class="h-8 w-8"
                    onclick={() => decrementQuantity()}
                  >
                    <Minus class="h-3 w-3" />
                  </Button>
                  <span class="w-4 text-center">{quantityCartSheet()}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    class="h-8 w-8"
                    onclick={() => incrementQuantity()}
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
          <div class="flex justify-between text-sm">
            <span>Impuestos</span>
            <span>$0.00 USD</span>
          </div>
          <div class="flex justify-between text-sm">
            <span>Envío</span>
            <span>Calculado al finalizar</span>
          </div>
          <div class="flex justify-between font-medium">
            <span>Total</span>
            <span>$15.00 USD</span>
          </div>
          <Button class="w-full bg-[#2563EB] text-white hover:bg-[#2563EB]/90">
            Proceder al Pago
          </Button>
        </div>
      </div>
    </div>
  </SheetContent>
</Sheet>

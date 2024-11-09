<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Menu, ShoppingCart } from 'lucide-svelte';
  import { Input } from '$lib/components/ui/input';
  import { getCartContext } from '$lib/context/cart.svelte';

  let { toggleCartSheet } = getCartContext();
</script>

<header class="px-4 flex">
  <div class="flex justify-between items-center py-4 gap-8 w-full">
    <div class="flex items-center gap-4 justify-start flex-1">
      <a href="/" class="flex items-center text-sm uppercase">
        <span class="text-lg font-semibold"> Goyita Store </span>
      </a>
      <nav class="hidden md:flex">
        <ul class="flex gap-4">
          <li>
            <a href="/categoria/hombres" class="text-sm hover:underline">
              Hombres
            </a>
          </li>
          <li>
            <a href="/categoria/mujeres" class="text-sm hover:underline">
              Mujeres
            </a>
          </li>
          <li>
            <a href="/categoria/kids" class="text-sm hover:underline">
              Niños
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <div class="flex-1 md:block hidden">
      <Input placeholder="Buscar productos" />
    </div>

    <div class="flex items-center flex-1 justify-end gap-2">
      <Button
        variant="ghost"
        onclick={() => {
          toggleCartSheet();
        }}
      >
        <ShoppingCart class="size-6" />
        <span class="sr-only">Cart</span>
      </Button>
      <a href="/login">
        <Button variant="ghost">Iniciar sesion</Button>
      </a>

      <a href="/register">
        <Button>Registrase</Button>
      </a>

      <Button variant="ghost" size="icon" class="md:hidden">
        <Menu class="size-6" />
        <span class="sr-only">Menu</span>
      </Button>
    </div>
  </div>
</header>

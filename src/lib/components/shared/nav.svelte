<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Menu, RabbitIcon, ShoppingCart } from 'lucide-svelte';
  import { Input } from '$lib/components/ui/input';
  import { getCartContext } from '$lib/context/cart.svelte';
  import LightSwitch from './light-switch.svelte';
  import { invalidate } from '$app/navigation';
  import UserLoggedIn from './UserLoggedIn.svelte';
  import { Badge } from '../ui/badge';

  let { user } = $props();
  let { toggleCartSheet, cartItems } = getCartContext();
</script>

<header class="px-36 flex">
  <div class="flex justify-between items-center py-4 gap-8 w-full">
    <div class="flex items-center gap-4 justify-start flex-1">
      <a
        href="/"
        class="flex items-center text-sm uppercase gap-2"
        onclick={() => {
          invalidate('filter:products');
        }}
      >
        <RabbitIcon className="size-6" />
        <span class="text-lg font-semibold"> Goyita Store </span>
      </a>

      <!-- <ul class="flex gap-4">
        <Button variant="outline">
          <a href="/productos"> Productos </a>
        </Button>
      </ul> -->
      <!-- <nav class="hidden md:flex">
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
      </nav> -->
    </div>

    <form
      class="flex-1 md:block hidden"
      action="/productos"
      onsubmit={() => {
        invalidate('filter:products');
      }}
    >
      <Input placeholder="Buscar productos" name="p" class="" />
    </form>

    <div class="flex items-center flex-1 justify-end gap-2">
      <Button variant="secondary">
        <a href="/productos"> Productos </a>
      </Button>
      <LightSwitch />
      <Button
        type="button"
        class="relative"
        variant="ghost"
        onclick={() => {
          toggleCartSheet();
        }}
      >
        <ShoppingCart class="size-6" />
        {#if cartItems.value.length > 0}
          <Badge
            class="absolute -top-1 -right-1 text-[10px] size-4 p-0 flex items-center justify-center rounded-full"
          >
            {cartItems.value.length}
          </Badge>
        {/if}
      </Button>

      {#if !user}
        <a href="/login" class="hidden md:block">
          <Button variant="ghost">Iniciar sesion</Button>
        </a>

        <a href="/register" class="hidden md:block">
          <Button>Registrase</Button>
        </a>
      {:else}
        <UserLoggedIn name={user.name} email={user.email} />
      {/if}

      <Button variant="ghost" size="icon" class="md:hidden">
        <Menu class="size-6" />
        <span class="sr-only">Menu</span>
      </Button>
    </div>
  </div>
</header>

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

  let isMenuOpen = $state(false);

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<header class="border-b">
  <div class="px-4 sm:px-6 lg:px-8 xl:px-36 mx-auto">
    <div class="flex items-center h-16">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <a
          href="/"
          class="flex items-center gap-2"
          onclick={() => {
            invalidate('filter:products');
          }}
        >
          <RabbitIcon class="size-6" />
          <span class="text-lg font-semibold">Goyita Store</span>
        </a>
      </div>

      <!-- Search Bar - Desktop -->
      <div class="hidden md:flex flex-1 px-8">
        <form
          class="w-full max-w-lg"
          action="/productos"
          onsubmit={() => {
            invalidate('filter:products');
          }}
        >
          <Input placeholder="Buscar productos" name="p" />
        </form>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-2">
        <Button variant="secondary">
          <a href="/productos">Productos</a>
        </Button>
        <LightSwitch />
        <Button
          type="button"
          class="relative"
          variant="ghost"
          onclick={toggleCartSheet}
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
          <Button variant="ghost">
            <a href="/login">Iniciar sesión</a>
          </Button>
          <Button variant="secondary">
            <a href="/register">Registrarse</a>
          </Button>
        {:else}
          <UserLoggedIn name={user.name} email={user.email} />
        {/if}
      </div>

      <!-- Mobile Navigation -->
      <div class="flex items-center gap-2 md:hidden ml-auto">
        <LightSwitch />
        <Button
          type="button"
          class="relative"
          variant="ghost"
          onclick={toggleCartSheet}
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
        <Button variant="ghost" size="icon" onclick={toggleMenu}>
          <Menu class="size-6" />
          <span class="sr-only">Menu</span>
        </Button>
      </div>
    </div>

    <!-- Mobile Menu -->
    {#if isMenuOpen}
      <div class="md:hidden py-4">
        <form
          class="mb-4"
          action="/productos"
          onsubmit={() => {
            invalidate('filter:products');
          }}
        >
          <Input placeholder="Buscar productos" name="p" class="w-full" />
        </form>

        <nav class="flex flex-col gap-2">
          <Button variant="secondary" class="w-full justify-start">
            <a href="/productos" class="w-full text-left">Productos</a>
          </Button>
          {#if !user}
            <Button variant="ghost" class="w-full justify-start">
              <a href="/login" class="w-full text-left">Iniciar sesión</a>
            </Button>
            <Button variant="secondary" class="w-full justify-start">
              <a href="/register" class="w-full text-left">Registrarse</a>
            </Button>
          {:else}
            <div class="w-full">
              <UserLoggedIn name={user.name} email={user.email} />
            </div>
          {/if}
        </nav>
      </div>
    {/if}
  </div>
</header>

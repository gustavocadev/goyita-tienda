<script lang="ts">
  import CartSheet from '$lib/components/cart-sheet.svelte';
  import Navbar from '$lib/components/shared/nav.svelte';
  import { setCartContextProvider } from '$lib/context/cart.svelte';
  import { ModeWatcher } from 'mode-watcher';
  import '../app.css';
  import { Toaster } from '$lib/components/ui/sonner';
  import Hero from '$lib/components/hero.svelte';
  import { page } from '$app/stores';

  let { children, data } = $props();

  const { setIsUserLoggedIn, setCartItems } = setCartContextProvider();

  $effect(() => {
    if (data.user) {
      setIsUserLoggedIn(true);
      setCartItems(data.cartItems);
      return;
    }
    setIsUserLoggedIn(false);
  });
</script>

<Toaster />
<ModeWatcher />
<Navbar user={data.user} />
{#if $page.url.pathname === '/'}
  <Hero />
{/if}
<main class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
  {@render children()}
</main>

<CartSheet />

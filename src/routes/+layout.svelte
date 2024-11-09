<script lang="ts">
  import CartSheet from '$lib/components/cart-sheet.svelte';
  import Navbar from '$lib/components/shared/nav.svelte'
  import { setCartContextProvider } from '$lib/context/cart.svelte';
  import { ModeWatcher } from "mode-watcher";
  import '../app.css'

	let { children } = $props();

  setCartContextProvider()
</script>

<ModeWatcher />
<Navbar />
<main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
  {@render children()}
</main>

<CartSheet />
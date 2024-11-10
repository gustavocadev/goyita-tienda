<script lang="ts">
  import CartSheet from '$lib/components/cart-sheet.svelte';
  import Navbar from '$lib/components/shared/nav.svelte'
  import { setCartContextProvider } from '$lib/context/cart.svelte';
  import { ModeWatcher } from "mode-watcher";
  import '../app.css'

	let { children, data } = $props();

  setCartContextProvider()
</script>

<ModeWatcher />
<Navbar
  user={data.user}
/>
<main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
  {@render children()}
</main>

<CartSheet />
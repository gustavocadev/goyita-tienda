<script lang="ts">
	import Navbar from '$lib/components/shared/nav.svelte'
  import '../app.css'
	let { children } = $props();
</script>


<Navbar
  quantity={0}
  isOpen={false}
/>
<main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
  {@render children()}
</main>

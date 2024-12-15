<script lang="ts">
  import { page } from '$app/stores';

  let { children } = $props();
</script>

<main
  class={`container mx-auto px-4 sm:px-6 lg:px-8 ${$page.url.pathname !== '/' ? 'py-32' : 'py-16'}`}
>
  {@render children()}
</main>

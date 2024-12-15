<script lang="ts">
  let { children } = $props();
</script>

<main
  class="px-4 sm:px-6 lg:px-8 py-16 login-gradient h-screen place-items-center"
>
  {@render children()}
</main>

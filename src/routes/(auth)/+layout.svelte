<script lang="ts">
  let { children } = $props();
</script>

<main
  class="px-4 sm:px-6 lg:px-8 login-gradient h-screen flex items-start justify-center py-32"
>
  {@render children()}
</main>

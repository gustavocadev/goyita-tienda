<script lang="ts">
  import { enhance } from '$app/forms';
  import Button from './ui/button/button.svelte';
</script>

<form action="?/createOrder" method="post" use:enhance>
  <Button class="w-full" type="submit">Pagar con Mercado Pago</Button>
</form>

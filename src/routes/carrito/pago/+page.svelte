<script lang="ts">
  import CheckoutPayment from '$lib/components/checkout-payment.svelte';
  import Separator from '$lib/components/ui/separator/separator.svelte';
</script>

<div class="space-y-2">
  <h2><span class="font-bold">Paso 1:</span> Elige el metodo de pago</h2>
  <Separator />
  <CheckoutPayment />
  <Separator />
</div>

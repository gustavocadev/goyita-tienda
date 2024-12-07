<script lang="ts">
  import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
  import CheckoutMercadoPago from '$lib/components/checkout-mercado-pago.svelte';
  import CheckoutPayment from '$lib/components/checkout-payment.svelte';
  import Separator from '$lib/components/ui/separator/separator.svelte';
  import Label from '$lib/components/ui/label/label.svelte';

  let { data } = $props();
  let selectedValue = $state('');
</script>

<div class="space-y-2">
  <h2><span class="font-bold">Paso 1:</span> Elige el metodo de pago</h2>
  <RadioGroup.Root
    value="option-one"
    onValueChange={(value) => {
      selectedValue = value;
    }}
  >
    <div class="flex items-center space-x-2">
      <RadioGroup.Item value="paypal" id="paypal" />
      <Label for="paypal">Paypal</Label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroup.Item value="mercado-pago" id="mercado-pago" />
      <Label for="mercado-pago">Mercado Pago</Label>
    </div>
  </RadioGroup.Root>

  {#if selectedValue === 'paypal'}
    <Separator />
    <CheckoutPayment />
  {:else if selectedValue === 'mercado-pago'}
    <Separator />
    <CheckoutMercadoPago />
  {/if}
</div>

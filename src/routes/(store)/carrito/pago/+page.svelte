<script lang="ts">
  import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
  import CheckoutMercadoPago from '$lib/components/checkout-mercado-pago.svelte';
  import CheckoutPayment from '$lib/components/checkout-payment.svelte';
  import Separator from '$lib/components/ui/separator/separator.svelte';
  import Label from '$lib/components/ui/label/label.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import EmptyCart from '$lib/components/empty-cart.svelte';

  let { data } = $props();
  let selectedValue = $state('');

  let paymentOptions = $state([
    { value: 'paypal', label: 'Paypal' },
    { value: 'mercado-pago', label: 'Mercado Pago' },
  ]);
</script>

{#if data.order}
  <div class="space-y-2">
    <h2><span class="font-bold">Paso 1:</span> Elige el metodo de pago</h2>
    <RadioGroup.Root value="">
      {#each paymentOptions as paymentOption}
        <Button
          onclick={() => {
            selectedValue = paymentOption.value;
          }}
          variant="outline"
          class="flex items-center justify-start"
        >
          <RadioGroup.Item
            value={paymentOption.value}
            id={paymentOption.value}
          />
          <Label for={paymentOption.value}>{paymentOption.label}</Label>
        </Button>
      {/each}
    </RadioGroup.Root>
    {#if selectedValue === 'paypal'}
      <Separator />
      <CheckoutPayment />
    {:else if selectedValue === 'mercado-pago'}
      <Separator />
      <CheckoutMercadoPago />
    {/if}
  </div>
{:else}
  <EmptyCart />
{/if}

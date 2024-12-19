<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '$lib/components/ui/card';
  import { CheckCircle } from 'lucide-svelte';

  let { data } = $props();
</script>

<div class="flex justify-center items-center">
  <Card class="w-full max-w-md">
    <CardHeader class="text-center">
      <CheckCircle class="w-16 h-16 mx-auto text-green-500 mb-4" />
      <CardTitle class="text-2xl font-bold text-green-700"
        >¡Pago Confirmado!</CardTitle
      >
    </CardHeader>
    <CardContent class="text-center">
      <p class="text-gray-600 mb-4">
        Tu pago se ha realizado con éxito. Gracias por tu compra.
      </p>
      <div class="p-4 rounded-lg bg-secondary">
        <h3 class="font-semibold mb-2">Detalles de la transacción:</h3>
        <p class="text-sm">Número de orden: #{data.invoice.invoice_number}</p>
        <p class="text-sm">Monto: S/. {data.invoice.total_amount}</p>
        <p class="text-sm">
          Fecha: {data.invoice.created}
        </p>
      </div>
    </CardContent>
    <CardFooter class="flex justify-center">
      <a href="/">
        <Button>Volver a la página principal</Button>
      </a>
    </CardFooter>
  </Card>
</div>

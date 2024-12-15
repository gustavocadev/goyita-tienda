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
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
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
      <div class="bg-gray-50 p-4 rounded-lg">
        <h3 class="font-semibold text-gray-700 mb-2">
          Detalles de la transacción:
        </h3>
        <p class="text-sm text-gray-600">Número de orden: #12345</p>
        <p class="text-sm text-gray-600">Monto: $99.99</p>
        <p class="text-sm text-gray-600">
          Fecha: {new Date().toLocaleDateString()}
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

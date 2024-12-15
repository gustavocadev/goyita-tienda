<script lang="ts">
  import { enhance, applyAction } from '$app/forms';
  import Button from '$lib/components/ui/button/button.svelte';
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '$lib/components/ui/card';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { getCartContext } from '$lib/context/cart.svelte';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { Heart, Lock, Mail } from 'lucide-svelte';

  let isPending = $state(false);

  const { cartItems } = getCartContext();

  const handleSubmit: SubmitFunction = () => {
    isPending = true;
    return async ({ result }) => {
      isPending = false;
      applyAction(result);
    };
  };
  const itemsIds = $derived(
    cartItems.value.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    })),
  );
</script>

<Card class="w-[380px] shadow-lg">
  <CardHeader class="space-y-1 flex flex-col items-center">
    <div
      class="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4"
    >
      <Heart class="w-6 h-6 text-primary floating" />
    </div>
    <CardTitle class="text-2xl">Iniciar sesión</CardTitle>
    <CardDescription>Ingresa a tu cuenta</CardDescription>
  </CardHeader>
  <CardContent>
    <form
      class="space-y-4"
      method="post"
      action="?/login"
      use:enhance={handleSubmit}
    >
      <input type="hidden" name="cartItems" value={JSON.stringify(itemsIds)} />
      <div class="space-y-2">
        <Label for="email">Correo electrónico</Label>
        <div class="relative">
          <Mail class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            placeholder="correo@ejemplo.com"
            type="email"
            name="email"
            class="pl-9"
            required
          />
        </div>
      </div>
      <div class="space-y-2">
        <Label for="password">Contraseña</Label>
        <div class="relative">
          <Lock class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            class="pl-9"
            required
            placeholder="********"
            name="password"
          />
        </div>
      </div>
      <Button type="submit" class="w-full" disabled={isPending}
        >Iniciar sesión</Button
      >
    </form>
    <div class="mt-4 text-center text-sm">
      ¿No tienes una cuenta?{' '}
      <a href="/register" class="text-primary hover:underline"> Regístrate </a>
    </div>
  </CardContent>
</Card>

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
  import type { SubmitFunction } from '@sveltejs/kit';

  let isPending = $state(false);

  const handleSubmit: SubmitFunction = () => {
    isPending = true;
    return async ({ result }) => {
      isPending = false;
      applyAction(result);
    };
  };
</script>

<div class="flex items-center justify-center">
  <Card class="w-full max-w-md">
    <CardHeader>
      <CardTitle class="text-2xl font-bold text-center"
        >Iniciar sesión</CardTitle
      >
      <CardDescription class="text-center">Ingresa a tu cuenta</CardDescription>
    </CardHeader>
    <CardContent class="space-y-2">
      <form method="post" action="?/login" use:enhance={handleSubmit}>
        <div class="space-y-4">
          <div class="space-y-2">
            <Label for="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              name="email"
              required
              placeholder="Correo electrónico"
            />
          </div>
          <div class="space-y-2">
            <Label for="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              name="password"
              required
              placeholder="Contraseña"
            />
          </div>
        </div>
        <Button class="w-full mt-6" type="submit" disabled={isPending}
          >Iniciar sesión</Button
        >
      </form>
      <div>
        ¿No tienes una cuenta?{' '}
        <a href="/register" class="text-sky-600 hover:underline">
          Regístrate
        </a>
      </div>
    </CardContent>
  </Card>
</div>

<script lang="ts">
  import { applyAction, enhance } from '$app/forms';
  import { Button } from '$lib/components/ui/button';
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
      <CardTitle class="text-2xl font-bold text-center">Crear cuenta</CardTitle>
      <CardDescription class="text-center">
        Crea una cuenta para comenzar
        <!-- {#each products as p}
          <p>{p.name}</p>
        {/each}

        <Button onclick={() => removeLastProduct()}>
          Eliminar último producto
        </Button> -->
      </CardDescription>
    </CardHeader>
    <CardContent class="space-y-2">
      <form method="post" action="?/register" use:enhance={handleSubmit}>
        <div class="space-y-4">
          <div class="space-y-2">
            <Label for="fullName">Nombre completo</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Nombre completo"
              name="fullName"
              required
            />
          </div>
          <div class="space-y-2">
            <Label for="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="Correo electrónico"
              name="email"
              required
            />
          </div>
          <div class="space-y-2">
            <Label for="password">Contraseña</Label>
            <Input
              id="password"
              type="text"
              name="password"
              required
              placeholder="Contraseña"
            />
          </div>

          <div class="space-y-2">
            <Label for="password">Confirmar contraseña</Label>
            <Input
              id="password"
              type="text"
              name="passwordConfirm"
              required
              placeholder="Confirmar contraseña"
            />
          </div>
        </div>

        <Button class="w-full mt-6" type="submit" disabled={isPending}
          >Crear cuenta</Button
        >
      </form>
      <div>
        ¿Ya tienes una cuenta?{' '}
        <a href="/login" class="text-sky-600 hover:underline">
          Inicia sesión
        </a>
      </div>
    </CardContent>
  </Card>
</div>

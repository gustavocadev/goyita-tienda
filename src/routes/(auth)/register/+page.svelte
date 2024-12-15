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
  import { Heart, Lock, Mail, User } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';

  let isPending = $state(false);

  const handleSubmit: SubmitFunction = () => {
    isPending = true;
    return async ({ result }) => {
      isPending = false;
      await applyAction(result);
      toast.success('Cuenta creada correctamente');
    };
  };
</script>

<Card class="w-[380px] shadow-lg">
  <CardHeader class="space-y-1 flex flex-col items-center">
    <div
      class="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4"
    >
      <Heart class="w-6 h-6 text-primary floating" />
    </div>
    <CardTitle class="text-2xl">Crear cuenta</CardTitle>
    <CardDescription>Regístrate para comenzar</CardDescription>
  </CardHeader>
  <CardContent>
    <form
      class="space-y-4"
      method="post"
      action="?/register"
      use:enhance={handleSubmit}
    >
      <div class="space-y-2">
        <Label for="fullName">Nombre completo</Label>
        <div class="relative">
          <User class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="fullName"
            type="text"
            placeholder="Nombre completo"
            name="fullName"
            required
            class="pl-9"
          />
        </div>
      </div>
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
            placeholder="Contraseña"
            name="password"
          />
        </div>
      </div>
      <div class="space-y-2">
        <Label for="passwordConfirm">Confirmar contraseña</Label>
        <div class="relative">
          <Lock class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="passwordConfirm"
            type="password"
            name="passwordConfirm"
            required
            class="pl-9"
            placeholder="Confirmar contraseña"
          />
        </div>
      </div>

      <Button type="submit" class="w-full" disabled={isPending}
        >Registrarse</Button
      >
    </form>
    <div class="mt-4 text-center text-sm">
      ¿Ya tienes una cuenta?{' '}
      <a href="/login" class="text-primary hover:underline">Iniciar sesion</a>
    </div>
  </CardContent>
</Card>

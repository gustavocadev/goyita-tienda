<script lang="ts">
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
  import { Heart, Lock, Mail, User } from 'lucide-svelte';
  import { superForm } from 'sveltekit-superforms/client';
  import { MetaTags } from 'svelte-meta-tags';
  import { toast } from 'svelte-sonner';

  let { data } = $props();
  const { enhance, submitting, errors } = superForm(data.form, {
    onUpdate: ({ result }) => {
      if (result.type === 'success') {
        toast.success('Cuenta creada exitosamente');
      }
      if (result.type === 'failure') {
        toast.error('El correo electrónico ya está registrado');
      }
    },
  });
</script>

<MetaTags
  title="Crear cuenta"
  description="Regístrate para comenzar"
  keywords={['crear cuenta', 'registro', 'registrarse']}
/>
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
    <form class="space-y-4" method="post" action="?/register" use:enhance>
      <div class="space-y-2">
        <Label for="fullName">Nombre completo</Label>
        <div class="relative">
          <User class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="fullName"
            type="text"
            name="fullName"
            class="pl-9"
            placeholder="Nombre completo"
          />
        </div>
        {#if $errors.fullName}
          <p class="text-red-500 text-sm">{$errors.fullName}</p>
        {/if}
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
          />
        </div>
        {#if $errors.email}
          <p class="text-red-500 text-sm">{$errors.email}</p>
        {/if}
      </div>
      <div class="space-y-2">
        <Label for="password">Contraseña</Label>
        <div class="relative">
          <Lock class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            class="pl-9"
            placeholder="Contraseña"
            name="password"
          />
        </div>
        {#if $errors.password}
          <p class="text-red-500 text-sm">{$errors.password}</p>
        {/if}
      </div>
      <div class="space-y-2">
        <Label for="passwordConfirm">Confirmar contraseña</Label>
        <div class="relative">
          <Lock class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="passwordConfirm"
            type="password"
            name="passwordConfirm"
            class="pl-9"
            placeholder="Confirmar contraseña"
          />
        </div>
      </div>

      <Button type="submit" class="w-full" disabled={$submitting}
        >Registrarse</Button
      >
    </form>
    <div class="mt-4 text-center text-sm">
      ¿Ya tienes una cuenta?{' '}
      <a href="/login" class="text-primary hover:underline">Iniciar sesion</a>
    </div>
  </CardContent>
</Card>

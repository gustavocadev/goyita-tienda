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

<div class="min-h-screen flex items-center justify-center">
  <Card class="w-full max-w-md">
    <CardHeader>
      <CardTitle class="text-2xl font-bold text-center">Login</CardTitle>
      <CardDescription class="text-center">
        Sign in to your account
        <!-- {#each products as p}
          <p>{p.name}</p>
        {/each} -->
      </CardDescription>
    </CardHeader>
    <CardContent class="space-y-2">
      <form method="post" action="?/login" use:enhance={handleSubmit}>
        <div class="space-y-4">
          <div class="space-y-2">
            <Label for="email">Email</Label>

            <Input
              id="email"
              type="text"
              name="email"
              required
              placeholder="Email"
            />
          </div>
          <div class="space-y-2">
            <Label for="password">Password</Label>
            <Input
              id="password"
              type="text"
              name="password"
              required
              placeholder="Password"
            />
          </div>
        </div>
        <Button class="w-full mt-6" type="submit" disabled={isPending}
          >Sign In</Button
        >
      </form>
      <div>
        Don't have an account?{' '}
        <a href="/register" class="text-sky-600 hover:underline"> Sign up </a>
      </div>
    </CardContent>
  </Card>
</div>

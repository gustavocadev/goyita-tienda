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

<div class="min-h-screen flex items-center justify-center">
  <Card class="w-full max-w-md">
    <CardHeader>
      <CardTitle class="text-2xl font-bold text-center">Sign up</CardTitle>
      <CardDescription class="text-center">
        Create an account to get started
        <!-- {#each products as p}
          <p>{p.name}</p>
        {/each}

        <Button onclick={() => removeLastProduct()}>
          Eliminar last one product
        </Button> -->
      </CardDescription>
    </CardHeader>
    <CardContent class="space-y-2">
      <form method="post" action="?/register" use:enhance={handleSubmit}>
        <div class="space-y-4">
          <div class="space-y-2">
            <Label for="fullName">Full Name</Label>

            <Input
              id="fullName"
              type="text"
              placeholder="Full Name"
              name="fullName"
              required
            />
          </div>
          <div class="space-y-2">
            <Label for="email">Email</Label>

            <Input
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              required
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

          <div class="space-y-2">
            <Label for="password">Password Confirm</Label>

            <Input
              id="password"
              type="text"
              name="passwordConfirm"
              required
              placeholder="Password Confirm"
            />
          </div>
        </div>

        <Button class="w-full mt-6" type="submit" disabled={isPending}
          >Create Account</Button
        >
      </form>
      <div>
        Already have an account?{' '}
        <a href="/login" class="text-sky-600 hover:underline"> Sign in </a>
      </div>
    </CardContent>
  </Card>
</div>

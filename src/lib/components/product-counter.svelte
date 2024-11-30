<script lang="ts">
  import { applyAction, enhance } from '$app/forms';
  import { Minus, Plus, Trash } from 'lucide-svelte';
  import { Button } from './ui/button';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { getCartContext, type ProductCart } from '$lib/context/cart.svelte';
  import { invalidate } from '$app/navigation';

  type Props = {
    cartProduct: ProductCart;
  };

  const handleIncrementSubmit: SubmitFunction = () => {
    return async ({ result }) => {
      applyAction(result);
    };
  };

  const handleDecrementSubmit: SubmitFunction = () => {
    return async ({ result }) => {
      await applyAction(result);
      invalidate('remove:items');
    };
  };

  let { cartProduct }: Props = $props();

  let { decrementQuantity, incrementQuantity, isUserLoggedIn, removeCartItem } =
    getCartContext();
</script>

<div class="flex items-center gap-3 bg-white/5 rounded-lg">
  <form
    method="post"
    use:enhance={handleDecrementSubmit}
    action={isUserLoggedIn.value ? '/?/decrementItem' : undefined}
  >
    <input type="hidden" name="productId" value={cartProduct.productId} />
    <Button
      variant="ghost"
      size="icon"
      class="h-8 w-8"
      onclick={() => {
        if (!isUserLoggedIn.value && cartProduct.quantity === 1) {
          removeCartItem(cartProduct.productId);
          return;
        }

        decrementQuantity(cartProduct.productId);
      }}
      type={isUserLoggedIn.value ? 'submit' : 'button'}
    >
      {#if cartProduct.quantity === 1}
        <Trash class="size-3" />
      {:else}
        <Minus class="size-3" />
      {/if}
    </Button>
  </form>
  <span class="w-4 text-center">{cartProduct.quantity}</span>
  <form
    action={isUserLoggedIn.value ? '/?/incrementItem' : undefined}
    method="post"
    use:enhance={handleIncrementSubmit}
  >
    <input type="hidden" name="productId" value={cartProduct.productId} />
    <Button
      variant="ghost"
      size="icon"
      class="h-8 w-8"
      type={isUserLoggedIn.value ? 'submit' : 'button'}
      onclick={() => {
        incrementQuantity(cartProduct.productId);
      }}
    >
      <Plus class="size-3" />
    </Button>
  </form>
</div>

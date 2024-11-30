<script lang="ts">
  type Props = {
    productTitle: string;
    productPrice: number;
    productImg?: string | undefined;
    productQuantity: number;
  };

  let { productTitle, productPrice, productImg }: Props = $props();

  // let
</script>

<div class="flex items-center gap-4">
  <img
    src={productImg}
    alt="Product Thumbnail"
    width={120}
    height={68}
    class="rounded-lg object-cover"
  />
  <div class="flex-1">
    <h3 class="font-medium">{productTitle}</h3>
    <button class="text-red-500 text-sm mt-1">Eliminar</button>
  </div>
  <div class="text-right">
    <p class="font-medium">S/{productPrice} SOL</p>
  </div>
</div>

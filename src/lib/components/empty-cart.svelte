<script>
  import Button from './ui/button/button.svelte';
</script>

<div class="container px-4 py-12">
  <div class="max-w-md mx-auto text-center">
    <h1 class="text-3xl font-bold mb-8">Carrito de compra</h1>

    <div class="mb-6">
      <img
        src="https://placehold.it/180x180"
        alt="Empty cart mascot"
        width={180}
        height={180}
        class="mx-auto rounded-md"
      />
    </div>

    <h2 class="text-xl font-semibold mb-2">Tu carrito está vacío</h2>

    <p class="text-muted-foreground mb-8">
      Más de 100 productos, ¿qué esperas para llenarlo?
    </p>

    <Button>
      <a href="/"> Sigue comprando </a>
    </Button>
  </div>
</div>

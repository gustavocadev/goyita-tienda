<script lang="ts">
  import Button from './ui/button/button.svelte';
</script>

<div class="relative h-[80vh] flex items-center">
  <div class="absolute inset-0 z-0">
    <img
      src="https://images.unsplash.com/photo-1613339038444-ca6b1e8eb7b4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Hero"
      class="w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-black/40" />
  </div>
  <div class="container mx-auto px-4 relative z-10">
    <div class="max-w-2xl text-white">
      <h1 class="text-5xl font-bold mb-6">Tu Peluche Perfecto te Espera</h1>
      <p class="text-xl mb-8">
        Descubre nuestra nueva colección 2024 y lleva la ternura a otro nivel
        con diseños únicos y suaves.
      </p>
      <a href="/productos">
        <Button variant="outline" class="text-black dark:text-white"
          >Ver productos</Button
        >
      </a>
    </div>
  </div>
</div>

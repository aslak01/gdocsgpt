<script lang="ts">
  import "@fontsource-variable/jost";
  import Navbar from "./navbar/navbar.svelte";
</script>

<main>
  <Navbar />
  <slot />
</main>

<style>
  @import "open-props/postcss/style";
  @import "open-props/postcss/normalize";
  :global(body) {
    margin: 0;
    background: var(--white);
    font-family: "Jost", sans-serif;
  }
  main {
    --gray: #333;
    --black: #111;
    --sheet: var(--stone-1);
    --background: var(--stone-3);
    --accent: var(--stone-6);
    --text-color: var(--gray-11);
    --_nav-height: var(--size-7);
    background: var(--background);
    min-block-size: 100%;
    height: 100dvh;
    overflow: hidden;
    color: var(--text-color);
  }
</style>

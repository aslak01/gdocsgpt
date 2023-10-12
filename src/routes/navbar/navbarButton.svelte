<script lang="ts">
  export let title: string;
  let active = false;
  function toggleActive() {
    active = !active;
  }
</script>

<li class="submenu-wrapper" class:active>
  <button on:click={toggleActive}>{title}</button>
  <slot />
</li>

<style>
  .submenu-wrapper {
    display: contents;
    position: relative;
  }
  button {
    all: unset;
    display: inline-block;
    box-sizing: border-box;
    font-size: var(--font-size-0);
    border-radius: var(--radius-2);
    padding-inline: var(--size-relative-2);
    padding-block: var(--size-relative-1);
  }
  button:hover {
    background: var(--stone-4);
    cursor: pointer;
  }
</style>

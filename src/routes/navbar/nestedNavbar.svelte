<script lang="ts">
  //
</script>

<ul class="submenu">
  <slot />
</ul>

<style>
  .submenu {
    display: none;
  }
  :global(.submenu-wrapper.active) .submenu {
    display: block;
    position: absolute;
    top: var(--_nav-height);
    left: 0;
    width: var(--size-13);
    background: var(--sheet);
    /* padding-inline: var(--size-2); */
    /* padding-block: var(--size-1); */
    font-size: calc(var(--font-size-0) * 1.2);
    box-shadow: var(--shadow-3);
    border-radius: var(--radius-2);
  }
  ul {
    padding: unset;
    display: flex;
    align-items: center;
    align-content: center;
    gap: var(--size-2);
  }
</style>

<script lang="ts">
  import NavbarButton from "./navbarButton.svelte";
  const dummyButtons = [
    "Edit",
    "View",
    "Insert",
    "Format",
    "Tools",
    "Extensions",
    "Help",
  ];
</script>

<nav>
  <ul>
    <NavbarButton title="File">
      <ul class="submenu">
        <li>hei</li>
        <li>noe mer</li>
        <li>noe på lista</li>
      </ul>
    </NavbarButton>
    {#each dummyButtons as btn}
      <NavbarButton title={btn} />
    {/each}
  </ul>
</nav>

<style>
  nav {
    background: var(--background);
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    gap: var(--size-2);
    padding: var(--size-1);
    height: var(--_nav-height);
  }

  .submenu {
    display: none;
  }
  :global(.submenu-wrapper.active) .submenu {
    display: block;
  }
  ul {
    padding: unset;
  }
</style>

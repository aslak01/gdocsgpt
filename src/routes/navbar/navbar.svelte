<script lang="ts">
  import NavbarButton from "./navbarButton.svelte";
  import NestedNavbar from "./nestedNavbar.svelte";
  import NestedNavbarButton from "./nestedNavbarButton.svelte";
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
      <NestedNavbar>
        <NestedNavbarButton>New</NestedNavbarButton>
        <NestedNavbarButton>Open</NestedNavbarButton>
        <NestedNavbarButton>API Key</NestedNavbarButton>
      </NestedNavbar>
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
    align-content: center;
    gap: var(--size-2);
    padding: var(--size-1);
    height: var(--_nav-height);
    --_menu-font-size: var(--font-size-0);
    border-bottom: 1px solid var(--accent);
  }

  ul {
    padding: unset;
    display: flex;
    align-items: center;
    align-content: center;
    gap: var(--size-2);
  }
</style>

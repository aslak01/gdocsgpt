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
        <li>New</li>
        <li>Open</li>
        <li>API Key</li>
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
    align-content: center;
    gap: var(--size-2);
    padding: var(--size-1);
    height: var(--_nav-height);
    --_menu-font-size: var(--font-size-0);
    border-bottom: 1px solid var(--accent);
  }

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
    padding-inline: var(--size-2);
    padding-block: var(--size-1);
    font-size: calc(var(--font-size-0) * 1.2);
    box-shadow: var(--shadow-3);
  }
  ul {
    padding: unset;
    display: flex;
    align-items: center;
    align-content: center;
    gap: var(--size-2);
  }
  li {
    padding: unset;
  }
</style>

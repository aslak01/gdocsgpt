<script lang="ts">
  import CaretRight from "carbon-icons-svelte/lib/CaretRight.svelte";
  import Contract from "carbon-pictograms-svelte/lib/Contract.svelte";

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
  <div class="iconwrapper">
    <a href="/">
      <Contract />
    </a>
  </div>
  <ul>
    <NavbarButton title="File">
      <NestedNavbar>
        <NestedNavbarButton>Login</NestedNavbarButton>
        <NestedNavbarButton>New</NestedNavbarButton>
        <NestedNavbarButton
          >Open
          <CaretRight size={20} />
        </NestedNavbarButton>
        <NestedNavbarButton>API Key</NestedNavbarButton>
        <NestedNavbarButton>Model</NestedNavbarButton>
        <NestedNavbarButton>Close</NestedNavbarButton>
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
    display: flex;
    grid-auto-flow: column;
    align-items: start;
    gap: var(--size-1);
    padding: var(--size-1);
    align-content: center;
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
  .iconwrapper {
    height: var(--size-7);
    width: var(--size-7);
  }
  .iconwrapper :global(svg) {
    height: 100%;
    width: 100%;
  }
  .iconwrapper a {
    display: contents;
    color: black;
  }
</style>

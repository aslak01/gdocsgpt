<script lang="ts">
  //
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
  <button>File</button>
  {#each dummyButtons as btn}
    <button>{btn}</button>
  {/each}
</nav>

<style>
  nav {
    background: var(--background);
    display: flex;
    gap: var(--size-2);
    padding: var(--size-1);
    height: var(--_nav-height);
  }
  button {
    all: unset;
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

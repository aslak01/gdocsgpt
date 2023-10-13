<li>
  <button on:click>
    <slot />
  </button>
</li>

<style>
  li {
    all: unset;
    display: block;
  }
  button {
    all: unset;
    box-sizing: border-box;
    padding: var(--size-1);
    padding-block: var(--size-2);
    display: grid;
    width: 100%;
  }
  button:hover {
    background: var(--stone-4);
    cursor: pointer;
  }
</style>

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
    padding: var(--size-2);
    padding-block: var(--size-1);
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  button:hover {
    background: var(--stone-3);
    cursor: pointer;
  }
</style>

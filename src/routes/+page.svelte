<script lang="ts">
  import { enhance } from "$app/forms";
  import Convo from "./Convo.svelte";
  import AddDocument from "carbon-pictograms-svelte/lib/AddDocument.svelte";
  export let data;
  console.log(data);
</script>

<div class="convos">
  <form method="POST" use:enhance>
    <label>
      <button type="submit"><AddDocument /></button>
      Ny
    </label>
  </form>
  {#if data?.conversations?.length > 0}
    {#each data.conversations as convo}
      <Convo {convo} />
    {/each}
  {/if}
</div>

<style>
  .convos {
    margin-block: var(--size-7);
    margin-inline: var(--size-3);
    border-radius: var(--radius-2);
    padding: var(--size-3);
    background: var(--sheet);
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    grid-auto-rows: minmax(100px, auto);
    overflow-y: auto;
    gap: var(--size-2);
  }
  form {
    display: flex;
    align-items: center;
  }
  button {
    all: unset;
    box-sizing: border-box;
    display: block;
    color: var(--text-color);
  }
  button:hover {
    cursor: pointer;
    color: var(--green-7);
  }
</style>

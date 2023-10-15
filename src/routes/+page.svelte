<script lang="ts">
  import { enhance } from "$app/forms";
  import Convo from "./Convo.svelte";
  import AddDocument from "carbon-pictograms-svelte/lib/AddDocument.svelte";
  export let data;
  console.log(data);
</script>

<div class="convos">
  <form method="POST" use:enhance>
    <button type="submit"><AddDocument /></button>
  </form>
  {#if data?.conversations?.length > 0}
    {#each data.conversations as convo}
      <Convo {convo} />
    {/each}
  {/if}
</div>

<style>
  button {
    all: unset;
    box-sizing: border-box;
    color: green;
  }
  button:hover {
    cursor: pointer;
  }
</style>

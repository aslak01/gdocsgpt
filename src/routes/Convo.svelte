<script lang="ts">
  import type { Conversation } from "$lib/types";
  import Documentation from "carbon-pictograms-svelte/lib/Documentation.svelte";
  export let convo: Conversation;
</script>

<div>
  <a href="/{convo.id}">
    <Documentation />
    {convo.id}</a
  >
</div>

<style>
  a {
    color: var(--text-color);
  }
  a:hover {
    color: var(--red-9);
  }
</style>

<script lang="ts">
  import { onMount } from "svelte";
  import SvelteMarkdown from "svelte-markdown";
  export let source: string;

  let answerWrapper: HTMLDivElement;

  onMount(() => {
    answerWrapper.scrollIntoView();
  });
</script>

<div bind:this={answerWrapper}>
  <SvelteMarkdown {source} />
</div>

<style>
  p {
    margin-block: var(--size-2);
  }
</style>

<script lang="ts">
  import { onMount } from "svelte";
  import SvelteMarkdown from "svelte-markdown";
  export let source: string;
  export let q: string;

  let answerWrapper: HTMLDivElement;

  onMount(() => {
    answerWrapper.scrollIntoView({ behavior: "smooth" });
  });
</script>

<div class="convo" bind:this={answerWrapper}>
  <p class="q">{q}</p>
  <SvelteMarkdown {source} />
</div>

<style>
  .q {
    padding-top: var(--_nav-height);
  }

  :global(.convo p) {
    margin-block: var(--size-2);
    max-inline-size: unset;
    hyphens: auto;
    -webkit-hyphens: auto;
  }
</style>

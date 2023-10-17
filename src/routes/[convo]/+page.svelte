<script lang="ts">
  import { enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";
  // import type { PageData, ActionData } from "./$types";
  export let form;
  export let data;
  $: console.log(data);
  let requesting = false;
  let submitBtn: HTMLButtonElement;
  let formEl: HTMLFormElement;

  function keydown(event: KeyboardEvent) {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      formEl.requestSubmit();
      // submitBtn.dispatchEvent(new MouseEvent("click", { cancelable: true }));
    }
  }

  const onSubmit: SubmitFunction = () => {
    requesting = true;

    return async ({ update }) => {
      requesting = false;
      await update();
    };
  };
</script>

<svelte:window on:keydown={keydown} />

<div class="field">
  <form method="POST" use:enhance={onSubmit} bind:this={formEl}>
    <div class="typefield">
      <!-- <button type="submit" bind:this={submitBtn}>Hei</button> -->
      <div class="answers">
        {#if data?.answers?.length}
          {#each data.answers as convo (convo.id)}
            <p>{@html convo.query}</p>
            <span>{@html convo.answer}</span>
          {/each}
        {/if}
      </div>
      <div class="textarea-wrapper">
        <textarea name="description" disabled={requesting} />
      </div>
    </div>
  </form>
</div>

<style>
  .field {
    --_margins: var(--size-9);
    --_half-margin: var(--size-5);
    background: var(--lightgray);
    height: 100%;
    overflow-x: auto;
  }
  form {
    display: flex;
    justify-content: center;
  }
  .textarea-wrapper {
    display: flex;
    flex: 1;
  }
  textarea {
    all: unset;
    box-sizing: border-box;
    width: 100%;
    flex: 1;
    padding-inline: var(--_margins);
    height: 100%;
  }
  p:not(:first-of-type) {
    padding-top: var(--_half-margin);
    padding-bottom: var(--size-2);
  }
  textarea[disabled] {
    color: var(--stone-2);
  }
  .typefield {
    padding-top: var(--_margins);
    border: 1px solid var(--accent);
    border-radius: var(--radius-1);
    background: var(--sheet);
    width: clamp(80ch, 80%, 500px);
    aspect-ratio: var(--ratio-portrait);
    margin-block: var(--size-8);
  }
  .answers {
    padding-inline: var(--_margins);
    padding-bottom: var(--_half-margin);
  }
</style>

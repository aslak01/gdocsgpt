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
      <textarea name="description" disabled={requesting} />
      <!-- <button type="submit" bind:this={submitBtn}>Hei</button> -->
      <div class="answers">
        <!-- {#each data.answers as answer (answer.id)} -->
        <!--   <span>{answer.query}</span> -->
        <!--   <br /> -->
        <!--   <span>{answer.answer}</span> -->
        <!--   <br /> -->
        <!-- {/each} -->
      </div>
    </div>
  </form>
</div>

<style>
  .field {
    --_margins: var(--size-9);
    background: var(--lightgray);
    height: 100%;
    overflow-x: auto;
  }
  form {
    display: flex;
    justify-content: center;
  }
  textarea {
    all: unset;
    box-sizing: border-box;
    width: 100%;
    padding-inline: var(--_margins);
    padding-top: var(--_margins);
  }
  .typefield {
    border: 1px solid var(--accent);
    border-radius: var(--radius-1);
    background: var(--sheet);
    width: clamp(80ch, 80%, 500px);
    aspect-ratio: var(--ratio-portrait);
    margin-block: var(--size-8);
  }
  .answers {
    padding-inline: var(--_margins);
  }
</style>

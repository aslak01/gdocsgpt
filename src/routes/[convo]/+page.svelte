<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { applyAction, deserialize } from "$app/forms";
  import type { ActionResult } from "@sveltejs/kit";
  import Answer from "./Answer.svelte";
  import { tick } from "svelte";
  // import type { PageData, ActionData } from "./$types";
  // export let form;
  export let data;
  $: console.log(data);
  let requesting = false;
  let formEl: HTMLFormElement;
  let textAr: HTMLTextAreaElement;

  function keydown(event: KeyboardEvent) {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      formEl.requestSubmit();
      // submitBtn.dispatchEvent(new MouseEvent("click", { cancelable: true }));
    }
  }

  // const onSubmit: SubmitFunction = () => {
  //   console.log("submitted");
  //   requesting = true;
  //
  //   return async ({ update }) => {
  //     requesting = false;
  //     await update();
  //   };
  // };

  /** @param {{ currentTarget: EventTarget & HTMLFormElement}} event */
  async function handleSubmit(event: SubmitEvent) {
    const { currentTarget } = event;
    if (currentTarget === null) return;
    const target = currentTarget as EventTarget & HTMLFormElement;
    const data = new FormData(target);

    const response = await fetch(target.action, {
      method: "POST",
      body: data,
    });

    const result: ActionResult = deserialize(await response.text());

    if (result.type === "success") {
      await invalidateAll();
      textAr.value = "";
    }

    applyAction(result);
    await tick();
    textAr && textAr.focus();
  }
</script>

<svelte:window on:keydown={keydown} />

<div class="field">
  <div class="page">
    <!-- <button type="submit" bind:this={submitBtn}>Hei</button> -->
    {#if data?.answers?.length}
      <div class="answers">
        {#each data.answers as convo (convo.id)}
          {@const q = convo.query}
          {@const source = convo.answer}
          <p>{@html convo.query}</p>
          <Answer {q} {source} />
        {/each}
      </div>
    {/if}
    <div class="textarea-wrapper">
      <form
        method="POST"
        on:submit|preventDefault={handleSubmit}
        bind:this={formEl}
      >
        <textarea name="userquery" disabled={requesting} bind:this={textAr} />
      </form>
    </div>
  </div>
</div>

<style>
  .field {
    --_margins: var(--size-9);
    --_half-margin: var(--size-5);
    background: var(--lightgray);
    overflow-x: auto;
    display: flex;
    justify-content: center;
  }
  form {
    width: 100%;
  }
  .textarea-wrapper {
    display: flex;
    flex: 1;
    height: -webkit-fill-available;
    height: -moz-fill-available;
    height: fill-available;
    /* border: 1px solid red; */
  }
  textarea {
    all: unset;
    box-sizing: border-box;
    padding-inline: var(--_margins);
    height: 100%;
    width: 100%;
    min-height: 100%;
    /* border: 1px solid green; */
    /* background: transparent; */
  }
  p:not(:first-of-type) {
    padding-top: var(--_half-margin);
    padding-bottom: var(--size-2);
  }
  textarea[disabled] {
    color: var(--stone-2);
  }
  .page {
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

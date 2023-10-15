<script lang="ts">
  import type { Conversation } from "$lib/types";
  export let convo: Conversation;
</script>

<div>
  <a href="/{convo.id}">{convo.id}</a>
</div>

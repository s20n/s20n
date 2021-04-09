<script lang="ts">
  import { Highlight } from "svelte-highlight";
  import { typescript } from "svelte-highlight/languages";
  import { vs2015 } from "svelte-highlight/styles";

  /** The source code */
  export let code: string = "";
</script>

<svelte:head>
  {@html vs2015}
</svelte:head>

{#if code}
  <Highlight language={typescript} {code}/>
{/if}

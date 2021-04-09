<script lang="ts">
  import { HighlightSvelte } from "svelte-highlight";
  import { vs2015 } from "svelte-highlight/styles";

  export let code: string = "";
</script>

<svelte:head>
  {@html vs2015}
</svelte:head>

{#if code}
  <HighlightSvelte {code}/>
{/if}

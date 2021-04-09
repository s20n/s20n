<script lang="ts">
	import One from "./setup/One.svelte";

	import { initS20n } from "s20n";

	initS20n([
		{path: "translations/en.json", name: "en"},
		{path: "translations/fr.json", name: "fr"},
	])
</script>

<img src="./icon-full.svg" alt="s20n icon">
<h1>S20n</h1>
<One/>

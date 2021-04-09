<script lang="ts">
  import { T } from "s20n";
  import Typescript from "../lib/TypeScript.svelte";

  const code = `
<script lang="ts">
    // Some imports...
    import S20n, { LanguageFile } from "s20n";

    // Some code...

    const locales: LanguageFile[] = [
        { path: "/static/locales/fr.json", name: "fr"},
        { path: "/static/locales/en.json", name: "en"},
        // other locales
    ]
</scrip>

<S20n {locales}/>
`
</script>

<h2><T key="setup.basic" fallback="Basic Setup"></T></h2>
<Typescript {code}></Typescript>

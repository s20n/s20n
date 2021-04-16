<script lang="ts">
    import { onMount } from "svelte";
    import type { LanguageFile } from "../lib/types";
    import { initS20n } from "../lib/init"

    /** An array of language files to load asynchronously. */
    export let files: LanguageFile[];

    onMount(() => {
        initS20n(files);
    });
</script>
<!--
    @component S20n

    The S20n component is a helper that replaces the `initS20n` function.


    `src/routes/$layout.svelte` (with typescript):

    ```svelte
    <script lang="ts">
        // Some imports...
        import S20n, { LanguageFile } from "s20n";

        // Some code...

        const locales: LanguageFile[] = [
            { path: "/static/locales/fr.json", name: "fr"},
            { path: "/static/locales/en.json", name: "en"},
            // other locales
        ]
    </script>

    <S20n {locales}/>

    <--- Something more code --->
-->

<script lang="ts">
    import { onMount } from "svelte";
    import type { LanguageFile } from "../lib/types";
    import { initS20n } from "../lib/init"

    /**
     * Required.
     *
     * An array of locales to load asynchronously.
     *
     * Note that they will all be loaded at once, *in order*.
     * Because of that, you should *always* set your first item to the same value as the `current` property.
     *
     */
    export let files: LanguageFile[];

    onMount(() => {
        initS20n(files);
    });
</script>

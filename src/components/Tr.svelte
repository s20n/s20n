<!-- TODO: add custom element to prevent having to import the element every time. -->
<!-- <svelte:options tag="s-tr"/> -->
<script lang="ts">
    import { t as translate } from "../lib/translate";

    /**
     * The string to translate.
     *
     * @example
     * ```svelte
     * <Tr t="the text to translate"/>
     * ```
     */
    export let t = "";
</script>
{$translate(t)}

<!--
    @component

    The Tr (Translate) component.

    @example
    ```svelte
    <script>
        import { Tr } from "s20n";
    </script>

    <Tr t="Some untranslated text"/>
    ```
-->

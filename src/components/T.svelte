<script lang="ts">
    import { t } from "../lib/translate";

    /**
     * The translation key. This is also the first parameter of the `t` aka translate function.
     */
    export let key: string;

    /**
     * The fallback if nothing is found at the specified key. Neither in the loaded language nor in the fallback language.
     */
    export let fallback: string = "";
</script>
<div>
    {$t(key, fallback)}
</div>
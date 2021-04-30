<script lang="ts">
	import { missingTranslations } from './../missingTranslations';
    import { downloadTranslations } from "./helpers";
    let showOverlay = false;
</script>
<div class:hidden="{showOverlay}">
    <div class = "overlay"></div>
    <div class="contents">
        <button on:click={downloadTranslations}>
            Download updated data for current locale.
        </button>
    </div>
</div>

<style>
    .overlay {
        z-index: 1001;
        position: fixed;
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;
        background-color: black;
        opacity: 0.6;
    }
    .contents {
        z-index: 1002;
        position: fixed;
        width: 95vw;
        height: 95vh;
        left: 2.5vw;
        top: 2.5vh;
        background-color: lightslategray;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .hidden {
        display: none;
    }
</style>

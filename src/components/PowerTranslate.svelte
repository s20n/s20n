<script lang="ts">
    import { saveAs } from 'file-saver';

    function s() {
        saveAs(new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"}), "helloworld.json");
    }
</script>

<div class:hidden={true}>
    <div class = "overlay"></div>
    <div class="contents">
        <button on:click={s}>
            Download new data
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

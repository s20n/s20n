# [<div class="title">S<span>20</span>N</div>](/)

<script>
    import { locale, Tr } from "s20n";

    function getNext() {
        if ($locale === "en") return "fr";
        else if ($locale === "fr") return "es";
        else return "en";
    }
    function toggleLanguage() {
        $locale = getNext();
    }
</script>

<button class="topButton" on:click="{toggleLanguage}">
    <img alt="Translation icon" src="./static/language.svg" height="100%" width="100%"/>
</button>
<div class="topLanguage">{$locale}</div>

<style>
    .topButton {
        position: absolute;
        top: 3px;
        /* Keep in sync with .topLanguage */
        left: calc(50% - 25px);
        height: calc(100% - 6px);
        width: 50px;
        border-radius: 7px;
        box-sizing: border-box;
    }
    .topLanguage {
        position: absolute;
        /* Keep in sync with .topButton */
        left: calc(50% - 50px);
        top: 0px;
    }

    .title {
        font-weight: 600;
        color: tomato;
    }
    span{
        color:var(--light);
    }
</style>

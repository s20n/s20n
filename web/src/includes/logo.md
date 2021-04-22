# [<div class="title">S<span>20</span>N</div>](/)

<script>
    import { locale, Tr } from "s20n";

    function toggleLanguage() {
        if ($locale === "en") $locale = "fr";
        else if ($locale === "fr") $locale = "es";
        else $locale = "en";
    }
</script>

<div class="topButton">
    <button on:click="{toggleLanguage}">{$locale}</button>
    <Tr t="My untranslated string"/>
</div>

<style>
    .topButton {
        position: absolute;
        top: 0px;
        left: 50%;
    }

    .title {
        font-weight: 900;
        color: tomato;
    }
    span{
        color:var(--light);
    }
</style>

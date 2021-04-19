# The locale store

The locale store can be used to retrieve or modify the currently displayed language or locale.

Here's how you would use it to toggle between two languages:

```example
<script>
    import { locale, T } from 's20n';

    function toggleLanguage() {
        if ($locale === "en") $locale = "fr";
        else $locale = "en";
    }
</script>
<p>Current language: {$locale}</p>
<button on:click="{toggleLanguage}"><T key="stores.locale.toggleLanguageButton"/></button>
```

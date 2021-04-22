# The locale store

The locale store can be used to retrieve or modify the currently displayed language or locale.

Here's how you would use it to toggle between two languages:

```example
<script>
    import { locale } from 's20n';

    function toggleLanguage() {
        if ($locale === "en") $locale = "fr";
        else if ($locale === "fr") $locale = "es";
        else $locale = "en";
    }
</script>
<p>Current language: {$locale}</p>
<button on:click="{toggleLanguage}"><s-tr t="Click on this button to loop between languages"/></button>
```

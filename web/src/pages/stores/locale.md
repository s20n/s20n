# The locale store

The locale store can be used to retrieve or modify the currently displayed language or locale.

Here's how you would use it to toggle between two languages:

<script>
    import { locale, Tr } from 's20n';

    function toggleLanguage() {
        if ($locale === "en") $locale = "fr";
        else if ($locale === "fr") $locale = "es";
        else $locale = "en";
    }
</script>

<button on:click="{toggleLanguage}"><Tr t="Click on this button to loop between languages"/></button>

```svelte
<script>
    import { locale, Tr } from 's20n';

    function toggleLanguage() {
        if ($locale === "en") $locale = "fr";
        else if ($locale === "fr") $locale = "es";
        else $locale = "en";
    }
</script>

<button on:click="{toggleLanguage}"><Tr t="Click on this button to loop between languages"/></button>
```

![S20n Icon](./static/s20n.svg "S20n Icon")

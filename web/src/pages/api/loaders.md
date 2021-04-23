# Loaders

By default, only json data can be used with s20n.
However, it is possible to use other file types, that allow easier line breaks,
comments, or more, by registering loaders before calling [`initS20n`](./initS20n).

For example, to use [`json5`](https://json5.org/), you can register a json5 loader.

*Note that since the following code is sandboxed, the top translate button will not work. Use the one on the right instead.*

```example
<script>
    import { registerLoader, initS20n, Tr, locale } from "s20n";
    import JSON5 from "json5";

    registerLoader({
        matcher: ".json5",
        handle: async function handler(path) {
            return fetch(path).then(r => r.text()).then(t => JSON5.parse(t));
        }
    })

    initS20n(
        [
            { path: "./static/translations/es.json5", name: "es"},
            { path: "./static/translations/fr.json5", name: "fr"},
        ],
        { readFromNavigator: false });

    function toggleLanguage() {
        if ($locale === "en") $locale = "fr";
        else if ($locale === "fr") $locale = "es";
        else $locale = "en";
    }
</script>
<Tr t='I am using "JSON5!"'/>
<button on:click="{toggleLanguage}" style="float: right;">Change Language</button>
```

![S20n Icon](./static/s20n.svg "S20n Icon")

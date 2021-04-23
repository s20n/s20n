# Loaders

By default, only json data can be used with s20n.
However, it is possible to use other file types, that allow easier line breaks,
comments, or more, by registering loaders before calling [`initS20n`](./initS20n).

For example, to use [`json5`](https://json5.org/), you can register a json5 loader.

```example
<script>
    import { registerLoader, initS20n, Tr } from "s20n";
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
</script>
<Tr t="I am using JSON5!"/>
```

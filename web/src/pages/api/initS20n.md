# initS20n

Initialization function. To be called once.

```svelte
initS20n(languages, options);
```

## Example
```svelte
<script>
    import { initS20n } from 's20n';

    initS20n([
        { path: "./static/locales/fr.json", name: "fr"},
        { path: "./static/locales/es.json", name: "es"},
        // etc.
    ]);
</script>
```

![S20n Icon](./static/s20n.svg "S20n Icon")

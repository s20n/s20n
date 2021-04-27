# initS20n

Initialization function. To be called once.

```typescript
initS20n(languages, options);
```

Where `options` is an object like the following.

```typescript
/** Default options passed to the `S20nInit` function.  */
export class DefaultS20nInitOptions {
    /**
     * Read the current language from the navigator.
     *
     * Default is `true`.
     */
    readFromNavigator = true;

    /**
     * Your source files contain untranslated text in this language.
     * Use this option to set the language that is to be seen as the "untranslated language".
     */
    sourceLocale = "en";

    /**
     * If set to `true`, during the initialization, S20n will preload all languages provided,
     * to prevent a slight loading time when the translation files are big.
     *
     * If set to an array of language codes, all these language files will be loaded.
     *
     * Defaults to `true`.
     */
    preload: boolean | string[] = true;
}
```

## Examples

### Using default options

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

### With custom options

```svelte
<script>
    import { initS20n } from 's20n';

    initS20n([
        { path: "./static/locales/fr.json", name: "fr"},
        { path: "./static/locales/it.json", name: "es"},
        // etc.
        ], {
            preload: ["fr", "es"],
            sourceLocale: "it",
            readFromNavigator: false
        }
    );
</script>
```

![S20n Icon](./static/s20n.svg "S20n Icon")

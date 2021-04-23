# Locales

The `locales` store contains all the translation data.

It's an object of this shape:

```json
{
    "fr": {
        "path": "./static/translations/fr.json",
        "data": {
            "some untranslated string": "une phrase traduite",
            "Houston, we've had a problem": "Houston, on a eu un problème",
            "We've had a Main B Bus Undervolt": "On a eu un bus principal B en sous-tension",
            // etc.
        }
    },
    "it": {
        //similar
    },
    // etc.
}
```

If `data` is empty when a translation is requested,
the `path` will be loaded with a matching [Loader](api/loaders), if one is found.

![S20n Icon](./static/s20n.svg "S20n Icon")

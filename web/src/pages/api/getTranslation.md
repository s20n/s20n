<script>import { getTranslation } from "s20n";</script>

# Get translation

The low-level `getTranslation(string, language)` function returns a string translated in a given language.

```svelte
<script>import { getTranslation } from "s20n";</script>

{getTranslation("My untranslated string", "es")}
```

> {getTranslation("My untranslated string", "es")}

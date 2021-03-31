# About

Ultra lightweight svelternationalization (s20n) internationalization library.

## Set up

Install it from npm with

```bash
npm install --save-dev s20n
```

Note that as any imported svelte component, [it needs to get imported as a dev dependency](https://github.com/sveltejs/sapper-template#using-external-components).

You'll need a locale folder, publicly accessible. Typically, this will be `public/locales/` or `static/locales/`. Your json files containing your translated strings will be there.

### For SvelteKit

`src/routes/$layout.svelte` (with typescript):

```svelte
<script lang="ts">
    // Some imports...
    import S20n from "$lib/i18n.svelte";
    import type { localeType } from "$lib/i18n.svelte";

    // Some code...

    const locales: localeType[] = [
        { path: "/static/locales/fr.json", name: "fr"},
        { path: "/static/locales/en.json", name: "en"},
        // other locales
    ]
</script>

<S20n current="en" {locales}/>
<--- Something else --->
```

### For other frameworks (sapper, pure svelte, etc.)

Your `<S20n/>` tag should only get loaded once. Raise issues if it doesn't work.

## Usage

To translate something, simply use `t` or its aliases: `_` or `translate`:

```svelte
<p>{$t("navbar.title", "The Great Fallback")}</p>
```

To set the current locale, set the `locale` store. Here's an example of a button that toggles between two languages (english and french):

```svelte
<script lang="ts">
    import { t, locale } from 's20n';
    function toggleLanguage() {
        if ($locale === "fr") {
            $locale = "en";
        }
        else {
            $locale = "fr";
        }
    }
</script>
<p on:click={toggleLanguage}>Toggle language</p>
```

## Features

### Multiline support

S20n supports multiline translations with [json5](https://json5.org/). This makes it easy to have long translations.

### Markdown

S20n supports markdown with [marked.js](https://marked.js.org/).

Note that markdown is disabled by default, and you can enable it for a single string with

```svelte
    <p>{$t("example.withMarkdown", null, { useMarkdown: true })}</p>
```

or globally by setting the `defaultTranslationParams` store:

```svelte
<script>
    import { defaultTranslationParams } from "s20n";
    $defaultTranslationParams.useMarkdown = true;
</script>
```

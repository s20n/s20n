# Getting started

## Set up

First install the s20n package using your favorite package manager.

```shell
npm i -D s20n
```

If you are using **SvelteKit**, the following is done inside the `$layout.svelte` page.
If you are using **Sapper**, the following is done inside the very similar `_layout.svelte`.

```html
<script>
    import { initS20n } from 's20n';

    initS20n([
        { path: "/static/translations/fr.json", name: "fr"},
        { path: "/static/translations/es.json", name: "es"},
        // etc.
    ]);
</script>
```

That's it. You can now start translating your app.

S20n provides a handy component, `<s-tr/>` to do that.
Since it is used on (almost) every string, it is exported as a [custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements), and because of that can be used without being imported as a svelte component.

```html
<s-tr t="My untranslated string"/>
```

Once again, that's it! No nested keys, no fallback, no trouble.

> But wait, where do I define the translations?

Inside the files you gave at the `initS20n` stage. Notice how there was no english translation registered? That's because your untranslated string **is** the english string.

Let's add a french and a spanish translation for your last sentence: create the file `"/static/translations/fr.json`, and put this content inside:

```json
{
    "My untranslated string": "Ma phrase traduite"
}
```

That's great, let's try it:

```example
<s-tr t="My untranslated string"/>
```

Now create a spanish `"/static/translations/es.json`:

```json
{
    "My untranslated string": "Mi frase traducida"
}
```

## Quick summary

To setup s20n, you'll need the [`initS20n` function](/api/initS20n), but afterwards, you'll mostly only use the [`s-tr` (aka translate) component](/components/s-tr).

To toggle between different languages, you'll need the [locale store](/stores/locale).

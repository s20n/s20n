<script>import { Tr } from 's20n';</script>

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
        { path: "./static/translations/fr.json", name: "fr"},
        { path: "./static/translations/es.json", name: "es"},
        // etc.
    ]);
</script>
```

That's it. You can now start translating your app.

S20n provides a handy component, [`Tr`](components/Tr) to do that.
<!-- Since it is used on (almost) every string, it is exported as a [custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements), and because of that can be used without being imported as a svelte component. -->

```html
<Tr t="My untranslated string"/>
```

Once again, that's it! No nested keys, no fallback, no trouble.

> But wait, where do I define the translations?

Inside the files you gave at the `initS20n` stage.
Notice how there was no english translation registered?
That's because your untranslated string **is** the english translation.

Let's add a french and a spanish translation for your last sentence:
create the file `"/static/translations/fr.json`, and put this content inside:

```json
{
    "My untranslated string": "Ma phrase traduite"
}
```

Do the same for the spanish translation (in `"/static/translations/es.json`):

```json
{
    "My untranslated string": "Mi frase traducida"
}
```

That's great, let's try it:

```html
<script>import { Tr } from 's20n';</script>
<Tr t="My untranslated string"/>
```

> <Tr t="My untranslated string"/>

**That's all!**

Now add translations, create a beautiful language changer component... Have fun translating!

## Editor setup

Using [I18n Ally](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally)
greatly improves translation productivity.
To set it up, simply include a `.vscode/i18n-ally-custom-framework.yml`
file with the following content:

```yaml
languageIds:
  - javascript
  - typescript
  - svelte

usageMatchRegex:
  - "[^\\w\\d]$t\\(['\"`]({key})['\"`]"
  - "<Tr t=['\"]({key})['\"]/>"

monopoly: true
```

## Quick summary

To setup s20n, you'll need the [`initS20n` function](api/initS20n), but afterwards,
you'll mostly only use the [`Tr` (aka translate) component](components/Tr).

To toggle between different languages, you'll need the [locale store](stores/locale).

![S20n Icon](./static/s20n.svg "S20n Icon")

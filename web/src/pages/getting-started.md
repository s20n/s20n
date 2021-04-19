# Getting started

## Set up

First install the s20n package using your favorite package manager.

```shell
npm i -D s20n
```

If you are using **SvelteKit**, the following is done inside the `$layout.svelt` page.
If you are using **Sapper**, the following is done inside the very similar `_layout.svelte`.

```svelte
<script>

</script>
```

## Quick summary

You'll need when setting up translations the [`initS20n` function](/functions/initS20n), but afterwards, you'll mostly only use the [T (aka translate) component](/components/T).

To toggle between different languages, you'll need the [locale store](/stores/locale).

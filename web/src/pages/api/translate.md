<script>
    import { Tr, t } from "s20n";

    $: d = $t("Download language");
</script>

# t (aka translate)

The `t` function can be used to translate a string.

Most of the times, you'll use the [`Tr` component](../components/Tr), but you might once in a while need it as a function. For example if you are showing multiple times the same string, and don't want the translation to be read from the data that many times.

With the [`Tr` component](../components/Tr), you would do something like the following:

```svelte
<script>
    import { Tr } from "s20n";
</script>

<div style="display: flex; align-items: center;">
    {#each ["fr", "en", "es", "it", "ar"] as l} <!-- You could have many more -->
        <button style="margin-right: 5px;"><Tr t="Download language"/> {l}</button>
    {/each}
</div>
```

<div style="display: flex; align-items: center;">
    {#each ["fr", "en", "es", "it", "ar"] as l}
        <button style="margin-right: 5px;"><Tr t="Download language"/> {l}</button>
    {/each}
</div>

So for each individual `Tr` component, a translation would be fetched.
What you could do instead is use the `t` function:

```svelte
<script>
    import { t } from "s20n";

    $: d = $t("Download language");
</script>

<div style="display: flex; align-items: center;">
    {#each ["fr", "en", "es", "it"] as l}
        <button style="margin-right: 5px;">{d} {l}</button>
    {/each}
</div>
```

<div style="display: flex; align-items: center;">
    {#each ["fr", "en", "es", "it"] as l}
        <button style="margin-right: 5px;">{d} {l}</button>
    {/each}
</div>

This way, the translation will only be loaded once from the registry, and will be reused for all occurrences.

## See also

[Tr (component)](components/Tr), [getTranslation](api/getTranslation)

## Implementation notes

This translate function behaves in a weird way: it is actually a store!
That's why you subscribe to it with `$t`, and not just `t`.

It's exact type is:

```typescript
//               The current locale      What it returns when the current locale changes
type T = derived<CustomWritable<string>, (untranslated: string) => string>;
```

That means whenever the current locale changes, a new translate function is generated,
and everything that depends on that function is updated.

![S20n Icon](./static/s20n.svg "S20n Icon")

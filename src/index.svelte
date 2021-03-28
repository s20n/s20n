<script lang="ts" context="module">
    import { writable, get, derived } from 'svelte/store';

    /** The locale to fallback to if the current locale doesn't contain the requested translation. */
    export const fallbackLocale = writable<string>("en");
    /** The currently displayed locale. */
    export const locale = writable<string>("Loading");

    const _loadedLocales = {};

    /** The type of the translate function. */
    type translateFunctionType = (path: string, defaultValue?: string) => string;
    /** The translate function. */
    export const t = derived<ReturnType<typeof writable>, translateFunctionType>(locale, () => {
        return function (path: string, defaultValue?: string): string {
            return getTranslation(path, defaultValue);
        }
    });
    /** alias for t (translate) */
    export const _ = t;
    /** alias for t */
    export const translate = t;

    function getTranslation(path: string, defaultValue?: string) {
      const children = path.split(".");
      const currentLocale = _loadedLocales[get(locale)];

      const wanted = getRecursiveValue(currentLocale, children);
      if (wanted) return wanted;

      if (get(fallbackLocale) !== currentLocale) {
          const fallback = getRecursiveValue(_loadedLocales[get(fallbackLocale)], children);
          if (fallback) return fallback;
      }

      if(defaultValue) return defaultValue;

      return path;
    }

    function getRecursiveValue(value: any, children: string[]) {
        if (!value) return null;
        for (const c of children) {
            if (!Object.hasOwnProperty.call(value, c)) {
                break;
            }
            value = value[c];
        }
        if (value) {
            return value;
        }
        return null;
    }

    /** Describes a locale with the path to its json file and its name. */
    export type localeType = {path: string, name: string};
</script>

<script lang="ts">
    import { onMount } from "svelte";

    /** An array of locales to load asynchronously. Note that they will all be loaded at once. */
    export let locales: localeType[];

    /** Also default loaded language. */
    export let current: string = "en";

    onMount(() => {
        async function loadLocale(path: string, localeCode: string) {
            return fetch(path)
                .then(response => response.json())
                .then((o: unknown) => _loadedLocales[localeCode] = o );
        }
        for (const l of locales) {
            if (l.name === current) {
                // set the locale to the loaded value to start force a notification.
                loadLocale(l.path, l.name).then(() => $locale = l.name);
            }
            else {
                loadLocale(l.path, l.name);
            }
        }
    });
</script>

<!--
@component
The S20n component provides internationalization for a Svelte app.
-->

<script lang="ts" context="module">
    import { writable, get, derived } from 'svelte/store';
    import marked from "marked";

    /** The locale to fallback to if the current locale doesn't contain the requested translation. */
    export const fallbackLocale = writable<string>("en");
    /** The currently displayed locale. */
    export const locale = writable<string>("Loading");

    /** The options that can be passed to the translate function */
    export interface TranslationParams {
        /**
         * Use [marked](https://marked.js.org).
         * Note that you need the `@html` tag in order for the html to be rendered correctly.
         */
        useMarkdown: boolean;
    }
    /** The default options passed to the translation function. Can be overwritten by setting the `params` argument. */
    export const defaultTranslationParams = writable<TranslationParams>({ useMarkdown: false })

    const _loadedLocales = {};

    /** The type of the translate function. */
    type translateFunctionType = (path: string, defaultValue?: string, params?: TranslationParams) => string;
    /** The translate function. */
    export const t = derived<ReturnType<typeof writable>, translateFunctionType>(locale, () => {
        return function (path: string, defaultValue?: string, params?: TranslationParams): string {
            let p: TranslationParams = Object.assign({}, get(defaultTranslationParams));
            Object.assign(p, params);
            if (p.useMarkdown) {
                return marked(getTranslation(path, defaultValue));
            }
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
    import JSON5 from "json5";

    /** An array of locales to load asynchronously. Note that they will all be loaded at once. */
    export let locales: localeType[];

    /** Default loaded language. */
    export let current: string = "en";

    onMount(() => {
        async function loadLocale(path: string, localeCode: string) {
            return fetch(path)
                .then((response: Response) => response.text())
                .then((text: string) => {
                    if (path.endsWith("json5")) {
                        return JSON5.parse(text);
                    }
                    return JSON.parse(text);
                })
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

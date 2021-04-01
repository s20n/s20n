<script lang="ts" context="module">
    import { writable, get, derived } from 'svelte/store';
    import marked from "marked";

    export const fallbackLocale = writable<string>("en");
    export const locale = writable<string>("Loading");

    export interface TranslationParams {
        useMarkdown: boolean;
    }
    export const defaultTranslationParams = writable<TranslationParams>({ useMarkdown: false })

    const _loadedLocales = {};

    type translateFunctionType = (path: string, defaultValue?: string, params?: TranslationParams) => string;
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
    export const _ = t;
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

    export type localeType = {path: string, name: string};
</script>

<script lang="ts">
    import { onMount } from "svelte";
    import JSON5 from "json5";

    export let locales: localeType[];

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

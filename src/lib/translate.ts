import { derived } from "svelte/store";
import { locale, fallbackLocale, locales } from "./stores";
import type { Locales } from "./types";
import lodashGet from "lodash-es/get";
import type { customWritable, CustomWritable } from "./customStores";

export type TranslateFunctionType = (path: string, fallback?: string) => string;

/**
 * The translate function.
 * Use as `$t` to be reactive to language changes.
 */
export const t = derived<ReturnType<typeof customWritable>, TranslateFunctionType>(locale, (): TranslateFunctionType => {
    return function (path: string, defaultValue?: string): string {
        const all = locales.get();

        const wanted = getData(all, locale, path);
        if (wanted) return wanted;

        const fallback = getData(all, fallbackLocale, path);
        if (fallback) return fallback;

        if(defaultValue) return defaultValue;

        return path;
    }
});

function getData(all: Locales, locale: CustomWritable<string>, path: string): string | null {
    const code = locale.get();
    const data = all[code]?.data;
    if (data) {
        const v = lodashGet(data, path);
        if (v && typeof v === "string") return v;
    }
    else {
        console.error("S20n: translate: Data not loaded for locale: ", code);
    }
    return null;
}

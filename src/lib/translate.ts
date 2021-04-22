import { derived } from "svelte/store";
import { locale, defaultLocale, locales } from "./stores";
import type { Locales } from "./types";
import type { customWritable } from "./customStores";

/**
 * The translate function type.
 *
 * The translate function takes the untranslated string as argument,
 * and returns the string translated in the current locale,
 * or the untranslated string if no translation is found.
 */
export type TranslateFunctionType = (untranslated: string) => string;

/**
 * The translate function.
 * Use as `$t` to be reactive to language changes.
 *
 * If you do not want reactivity, use `getTranslation` instead.
 */
export const t = derived<ReturnType<typeof customWritable>, TranslateFunctionType>(locale, (): TranslateFunctionType => {
    return function (untranslated: string): string {
        const code = locale.get();

        if (defaultLocale.get() === code) {
            return untranslated;
        }

        return getTranslation(untranslated, code);
    }
});

/**
 * Low level function to get the translation of a string in a specific locale.
 *
 * It is recommended to use the `<T></T>` component or the `$t` store whenever possible,
 * but this may be needed from times to times.
 */
export function getTranslation(untranslated: string, toLocale: string): string {
    const loadedData: Locales = locales.get();

    if (!loadedData) {
        console.error("S20n: getTranslation: no loaded locales.");
        return untranslated;
    }

    const localeInfo = loadedData[toLocale];
    const localeData = localeInfo?.data;

    if (!localeInfo || !localeData) {
        console.warn("S20n: getTranslation: no loaded translations for locale", toLocale);
        return untranslated;
    }

    const translation = localeData[untranslated];
    if (!translation) {
        console.warn(`S20n: getTranslation: locale ${locale.get()} has no translation for "${untranslated}"`);
        return untranslated;
    }

    return translation;
}

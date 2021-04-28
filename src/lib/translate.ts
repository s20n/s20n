import { derived } from "svelte/store";
import { locale, locales } from "./load";
import type { Locales } from "./types";
import type { CustomWritable } from "./customStores";
import { sourceLocale } from "./sourceLocale";

export let powerTranslateMode: boolean = false;

function download(element: HTMLAnchorElement) {
    console.log(locales.get()[locale.get()]?.data);
    element.setAttribute('href', 'data:text/plain;charset=utf-8, ' + encodeURIComponent(JSON.stringify(locales.get()[locale.get()])));
    element.setAttribute('download', locale.get() + ".json");
    // element.click();
}

export function setPowerTranslateMode(v: boolean) {
    powerTranslateMode = v;
    if (document) {
        let downloadButton = document.getElementById("s20n-downloadbutton-ai8h4rv23qm1i5") as HTMLAnchorElement;
        if (!downloadButton) {
            downloadButton = document.createElement("a");
            downloadButton.id = "s20n-downloadbutton-ai8h4rv23qm1i5";
            downloadButton.style.position = "fixed";
            downloadButton.style.bottom = "20px";
            downloadButton.style.right = "20px";
            downloadButton.style.borderRadius = "10px";
            downloadButton.style.padding = "10px";
            downloadButton.style.backgroundColor = "blue";
            downloadButton.style.textDecoration = "none";
            downloadButton.style.cursor = "pointer";
            downloadButton.style.color = "white";
            downloadButton.addEventListener("click", () => download(downloadButton))
            downloadButton.textContent = "Download updated json file for current language.";
            document.body.appendChild(downloadButton);
        }
        downloadButton.style.display = v ? "block" : "none";
    }
}

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
export const t = derived<CustomWritable<string>, TranslateFunctionType>(locale, (): TranslateFunctionType => {
    return function (untranslated: string): string {
        return getTranslation(untranslated, locale.get());
    }
});

/**
 * Low level function to get the translation of a string in a specific locale.
 *
 * It is recommended to use the `<Tr t="..."/>` component or the `$t` store whenever possible,
 * but this may be needed from times to times.
 */
export function getTranslation(untranslated: string, toLocale: string): string {
    // Nothing to translate: asking to translate the string into its written language.
    if (sourceLocale === toLocale) {
        return untranslated;
    }

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
        if (powerTranslateMode) {
            const newTranslation = window.prompt(`No translation found in locale ${locale.get()} for string "${untranslated}"
Type in this box to add one.`);
            localeData[untranslated] = newTranslation;
        }
        else {
            console.warn(`S20n: getTranslation: locale ${locale.get()} has no translation for "${untranslated}"`);
        }
        return untranslated;
    }

    return translation;
}

// Attempt at a template string translation function
//
// /**
//  * A (template string)[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals]
//  * for translations.
//  *
//  *
//  * @param template The array of strings that concatenated, form the template string.
//  * @param substitutions
//  */
// function tr(template: TemplateStringsArray, ...substitutions: (string | number)[]): string {
//     return String.raw(template, substitutions);
// }

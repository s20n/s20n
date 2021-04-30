/** Helpers for PowerTranslators */

import { locales } from "../load";
import { saveAs } from 'file-saver-es';

export function downloadTranslations(locale: string) {
    const l = locales.get()[locale];
    if (l) {
        const d = l.data;
        if (d) {
            saveAs(new Blob([JSON.stringify(d)], {type: "text/plain;charset=utf-8"}), `${locale}.json`);
        }
    }
}

export function addTranslation(locale: string, untranslated: string, translation: string) {
    const ls = locales.get();
    const localeInfo = ls[locale];
    const localeData = localeInfo?.data;

    if (!localeInfo || !localeData) {
        console.warn(`S20n: addTranslation: no loaded translations for locale ${locale}.
Add one, even empty, in inits20n before using a PowerTranslator.`);
        return;
    }

    const existingTranslation = localeData[untranslated];
    if (existingTranslation) {
        console.warn(`s20n: addTranslation: translation already exists for string "${untranslated}" in language "${locale}"`)
    }
    localeData[untranslated] = translation;
}

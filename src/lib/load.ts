import { defaultLocale } from "./init";
import { load } from "./loaders/loaders";

import { locales } from "./stores";
import type { TranslationData } from "./types";

/**
 * Low level function to load a translation file.
 * You should probably not use this function, but use `loadLocale` instead.
 *
 * @param path Path to the file.
 * @param name Locale code aka shortened language name (en for english).
 */
async function privateLoadLocale(path: string, name: string): Promise<void> {
    return load(path).then((o: TranslationData | null) => {
        if (o) {
            const localesStoreValue = locales.get();
            // If it has already been loaded
            if (Object.prototype.hasOwnProperty.call(localesStoreValue, name)) {
                const locale = localesStoreValue[name];
                // If the path has changed, delete the old data.
                if (locale.path !== path) {
                    locale.data = null;
                }
            }
            localesStoreValue[name] = {
                data: o,
                path: path
            }
        }
        else {
            console.error(`S20n: loadLocale: Could not load locale ${name}`)
        }
    });
}

/**
 * Query if a language file has been loaded yet.
 * @param name The language code.
 * @returns Wheter the language has been loaded yet.
 */
export function isLoaded(name: string): boolean {
    // return true if it is the untranslated locale
    if (name === defaultLocale) return true;

    // Check if there is something at that name, and that it has data.
    return !!locales.get()[name]?.data;
}

/**
 * Low level function to load a translation file.
 *
 * You normally shouldn't use this because the init function
 * handles the loading of the provided locales.
 *
 * If you have set `preload` to `false` in `initS20n`,
 * and you want to preload some languages before the user sets them as current
 * (they are automatically loaded when set as current locale),
 * you should instead use `loadIfNotLoaded`.
 *
 * @param name The language code of the language to use.
 * @returns A promise that resolves when the locale is loaded.
 */
function doLoadLocale(name: string): Promise<void> {
    const l = locales.get();
    if (Object.prototype.hasOwnProperty.call(l, name)) {
        return privateLoadLocale(l[name].path, name);
    }
    console.error("S20n: load: could not load locale " + name + " without having a path to its LanguageFile set in init().");
    return Promise.resolve();
}


/**
 * Fetch from the network the data for a given language.
 *
 * @param languageCode The language to load. "es", "en", "fr", etc.
 * @returns A promise that resolves when the data is loaded.
 * It will resolve immediately if the data was already loaded.
 */
export async function loadLocale(languageCode: string): Promise<void> {
    if (!isLoaded(languageCode)) return doLoadLocale(languageCode);
    else return Promise.resolve();
}

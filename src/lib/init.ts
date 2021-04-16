
import type { LanguageFile } from "./types";
import { fallbackLocale, locale, locales } from "./stores";


/**
 * This function should be called once to initialize the s20n package.
 *
 * @export
 * @param files An array of path and language codes.
 * @param readFromNavigator Read the default language from the navigator. Default is true.
 *
 * @example
 *
 * ```typescript
 * import { initS20n, LanguageFile } from 's20n';
 *
 * const locales: LanguageFile[] = [
 *     { path: "/static/locales/en.json", name: "en"}, // first, hence default
 *     { path: "/static/locales/fr.json", name: "fr"}, // second, hence fallback
 *     // other locales
 * ]
 *
 * initS20n(locales)
 * ```
 */
export async function initS20n(files: LanguageFile[], defaultLanguage: boolean = true): Promise<void> {
    if (files.length) {
        const localesValue = locales.get();

        // initialize the locales with null data.
        for (const f of files) {
            localesValue[f.name] = {
                path: f.path,
                data: null,
            }
        }

        let navigatorLanguageSet = "";
        if (defaultLanguage) {
            const languageNames = files.map((f: LanguageFile) => f.name );
            if (languageNames.includes(navigator.language)) {
                locale.set(navigator.language);
                navigatorLanguageSet = navigator.language;
            }
            else {
                const navigatorLanguage = navigator.language.slice(0, 1);
                if (languageNames.includes(navigatorLanguage)) {
                    locale.set(navigator.language);
                    navigatorLanguageSet = navigatorLanguage;
                }
            }

            if (navigatorLanguageSet) {
                const firstFileName = files[0].name;
                if (navigatorLanguageSet === firstFileName) {
                    fallbackLocale.set(files[1].name);
                } else {
                    fallbackLocale.set(firstFileName);
                }
            }
            else {
                console.warn("s20n: init: you have no translations for this user's language.");
            }
        }

        if (!navigatorLanguageSet) {
            const first = files[0];
            const result = locale.set(first.name);

            const second = files[1];
            if (second) {
                fallbackLocale.set(second.name);
            }
            else {
                console.error("s20n: initS20n: Only one language file given in argument 'files'. Are you sure this is what you wanted?")
            }
            return result;
        }
    }
    else {
        console.error("s20n: initS20n: argument 'files' is empty.");
    }
    return Promise.resolve();
}

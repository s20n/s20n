
import { LanguageFile } from "./types";
import { fallbackLocale, locale, locales } from "./stores";
import { loadLocale, privateLoadLocale } from "./load";


/**
 * This function should be called once to initialize the s20n package.
 *
 * @export
 * @param files An array of path and language codes.
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
export async function initS20n(files: LanguageFile[]): Promise<void> {
    if (files.length) {
        const localesValue = locales.get();

        // initialize the locales with null data.
        for (const f of files) {
            localesValue[f.name] = {
                path: f.path,
                data: null,
            }
        }

        const first = files[0];
        const result = privateLoadLocale(first.path, first.name).then(() => locale.set(first.name));

        const second = files[1];
        if (second) {
            privateLoadLocale(second.path, second.name).then(() => fallbackLocale.set(second.name));
        }
        else {
            console.error("s20n: initS20n: Only one language file given in argument 'files'. Are you sure this is what you wanted?")
        }
        return result;
    }
    else {
        console.error("s20n: initS20n: argument 'files' is empty.");
    }
    return Promise.resolve();
}
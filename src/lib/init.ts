
import type { LanguageFile, Optionalize } from "./types";
import { locale, locales } from "./stores";


/**
 * This variable contains the locale that you use inside your markup.
 *
 * **This variable should remain unchanged after the original assignment in `initS20n`.**
 *
 * @example
 *
 * If you write your svelte code like that:
 *
 * ```svelte
 * <Tr t="Ma langue par défaut est le français."/>
 * ```
 *
 * Then you should set `defaultLocale` to "fr". (By setting `untranslatedLanguageCode` in `s20nInit`)
 *
 * But if you write by default in english, you would need `defaultLocale` to be "en".
 * Note that "en" is the value by default.
 */
 export let defaultLocale: string = "en";

/** Default options passed to the `S20nInit` function.  */
export class DefaultS20nInitOptions {
    /**
     * Read the current language from the navigator.
     *
     * Default is `true`.
     */
    readFromNavigator = true;

    /**
     * Your source files contain untranslated text.
     * Use this option to set the language that is to be seen as the "untranslated language".
     */
    untranslatedLanguageCode = "en";

    /**
     * If set to `true`, during the initialization, S20n will preload all languages provided,
     * to prevent a slight loading time when the translation files are big.
     *
     * If set to an array of language codes, all these language files will be loaded.
     *
     * Defaults to `true`.
     */
    preload: boolean | string[] = true;
}

export type S20nInitOptions = Optionalize<DefaultS20nInitOptions>;

/**
 * This function should be called once to initialize the s20n package.
 *
 * @export
 * @param files An array of path and language codes.
 * @param options Additional options, like whether to read the current language
 * from the user's navigator and what language your source files are written in.
 *
 * @example
 *
 * ```typescript
 * import { initS20n } from 's20n';
 *
 * initS20n([
 *     { path: "./static/locales/fr.json", name: "fr"},
 *     { path: "./static/locales/it.json", name: "it"},
 *     // etc.
 * ]);
 * ```
 *
 * You can also pass options:
 * ```typescript
 * import { initS20n } from 's20n';
 *
 * initS20n([
 *     { path: "./static/locales/fr.json", name: "fr"},
 *     { path: "./static/locales/it.json", name: "es"},
 *     // etc.
 *     ], {
 *          preload: false,
 *          untranslatedLanguageCode: "it",
 *          readFromNavigator: false
 *      }
 * );
 * ```
 */
export async function initS20n(files: LanguageFile[], options: S20nInitOptions = {}): Promise<void> {
    // check validity of input
    if (!files.length) {
        console.error("s20n: initS20n: argument 'files' is empty.");
        return;
    }

    // Get options
    const defaults = new DefaultS20nInitOptions();
    Object.assign(defaults, options);
    const { readFromNavigator, untranslatedLanguageCode, preload } = defaults;

    // Set the untranslated language. **THIS IS THE ONLY PLACE WHERE IT SHOULD BE DONE**
    defaultLocale = untranslatedLanguageCode;

    // initialize the locales with null data.
    const localesValue = locales.get();
    for (const f of files) {
        localesValue[f.name] = {
            path: f.path,
            data: null,
        }
    }

    // Get language from navigator
    let navigatorLanguageSet = "";
    if (readFromNavigator) {
        const languageNames = files.map((f: LanguageFile) => f.name );
        languageNames.push(defaultLocale);
        if (languageNames.includes(navigator.language)) {
            locale.set(navigator.language);
            navigatorLanguageSet = navigator.language;
        }
        else {
            const navigatorLanguage = navigator.language.slice(0, navigator.language.indexOf("-") - 1);
            if (languageNames.includes(navigatorLanguage)) {
                locale.set(navigator.language);
                navigatorLanguageSet = navigatorLanguage;
            }
        }

        if (!navigatorLanguageSet) {
            console.warn("s20n: init: there is no translations for your current language. S20n will use the default language.");
        }
    }

    if (!navigatorLanguageSet) {
        locale.set(untranslatedLanguageCode);
    }

    return;
}

import type { Locales } from "./types";
import { customWritable, CustomWritable } from "./customStores";
import { noop } from "svelte/internal";
import { loadLocale } from "./load";

/**
 * An object containing all translations for all loaded languages.
 *
 * By default, all language data is loaded, unless you set `preload` to `false`
 * or to an array of language codes in `initS20n`.
 */
export const locales: CustomWritable<Locales> = customWritable({});

/**
 * The locale/language currently displayed to the user.
 */
export const locale: CustomWritable<string> = customWritable("en", noop, loadLocale);

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
 * Then you should set `defaultLocale` to "fr".
 *
 * But if you write by default in english, you would need `defaultLocale` to be "en".
 * Note that "en" is the value by default.
 */
export const defaultLocale: CustomWritable<string> = customWritable("en");

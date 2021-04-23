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

import type { Locales } from "./types";
import { customWritable, CustomWritable } from "./customStores";
import { noop } from "svelte/internal";
import { loadIfNotLoaded } from "./load";

/**
 * An object containing all translations for all loaded languages.
 * Languages are only loaded when needed. To preload some languages, use the `loadLocale` function.
 */
export const locales: CustomWritable<Locales> = customWritable({});

/** The currently displayed locale. */
export const locale: CustomWritable<string> = customWritable("en", noop, loadIfNotLoaded);

/** The locale to fallback to if the current locale doesn't contain the requested translation. */
export const fallbackLocale = customWritable<string>("en", noop, loadIfNotLoaded);

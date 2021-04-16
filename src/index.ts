export { default as S20n } from "./components/S20n.svelte";
export { default as T } from "./components/T.svelte";


export { registerLoader } from "./lib/loaders/loaders";
export type { Loader } from "./lib/loaders/loaders";

export { initS20n } from "./lib/init";
export { isLoaded, loadLocale } from "./lib/load";
export { fallbackLocale, locales, locale } from "./lib/stores";
export { _, t } from "./lib/translate";
export type { TranslateFunctionType } from "./lib/translate";
export type { LanguageFile, Locale, Locales, TranslationData } from "./lib/types";

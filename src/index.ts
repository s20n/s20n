export { default as Tr } from "./components/Tr.svelte";

export { registerLoader } from "./lib/loaders/loaders";
export type { Loader } from "./lib/loaders/loaders";

export { initS20n } from "./lib/init";
export { isLoaded, loadLocale } from "./lib/load";
export { locales, locale } from "./lib/stores";
export { t } from "./lib/translate";
export type { TranslateFunctionType } from "./lib/translate";
export type { LanguageFile, Locale, Locales, TranslationData } from "./lib/types";
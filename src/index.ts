export { default as Tr } from "./components/Tr.svelte";
export { default as PowerTranslate } from "./components/PowerTranslate.svelte";

export { registerLoader } from "./lib/loaders/loaders";
export type { Loader } from "./lib/loaders/loaders";

export { initS20n } from "./lib/init";
export { isLoaded, loadLocale, locales, locale } from "./lib/load";
export { t, getTranslation } from "./lib/translate";
export type { TranslateFunctionType } from "./lib/translate";
export type { LanguageFile, Locale, Locales, TranslationData } from "./lib/types";

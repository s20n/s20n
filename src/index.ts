export { default as S20n } from "./components/S20n.svelte";
export { default as T } from "./components/T.svelte";

export { Loader, registerLoader} from "./lib/loaders/loaders";

export { initS20n } from "./lib/init";
export { isLoaded, loadLocale } from "./lib/load";
export { fallbackLocale, locales, locale } from "./lib/stores";
export { TranslateFunctionType, _, t } from "./lib/translate";
export { LanguageFile, Locale, Locales, TranslationData } from "./lib/types";
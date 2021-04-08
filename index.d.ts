export * from "./typings/index";

import { SvelteComponentTyped } from 'svelte';
import { LanguageFile } from "./typings/index";

/** The props that can be passed to the S20n component. */
export interface S20nProps {
    /** An array of locales to load asynchronously. */
    locales: LanguageFile[];
}

/**
 * The S20n component provides internationalization for a Svelte app.
 *
 * `src/routes/$layout.svelte` (with typescript):
 *
 * ```svelte
 * <script lang="ts">
 *     // Some imports...
 *     import S20n, { LanguageFile } from "s20n";
 *
 *     // Some code...
 *
 *     const locales: LanguageFile[] = [
 *         { path: "/static/locales/fr.json", name: "fr"},
 *         { path: "/static/locales/en.json", name: "en"},
 *         // other locales
 *     ]
 * </script>
 *
 * <S20n {locales}/>
 *
 * <--- Something more code --->
 * ```
 */
export default class S20n extends SvelteComponentTyped<S20nProps> { }

/** The props that can be passed to the T (aka translate) component. */
export interface TProps {
    /** The translation key. This is also the first parameter of the `t` aka translate function. */
    key: string;

    /**
     * The fallback if nothing is found at the specified key. Neither in the loaded language nor in the fallback language.
     */
    fallback: string;
}

/**
 * The T (Translate) component.
 */
export default class T extends SvelteComponentTyped<TProps> { }
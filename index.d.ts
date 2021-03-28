declare module "svelte-routing" {
    import { SvelteComponentTyped } from 'svelte';

    export interface RouterProps {
        /** An array of locales to load asynchronously. Note that they will all be loaded at once. */
        locales: string;
        /** Also default loaded language. */
        current?: string;
    }
    /** The S20n component provides internationalization for a Svelte app. */
    export class S20n extends SvelteComponentTyped<RouterProps> {}

    /** Describes a locale with the path to its json file and its name. */
    export type localeType = {path: string, name: string};

    import { writable, get, derived } from 'svelte/store';

    /** The locale to fallback to if the current locale doesn't contain the requested translation. */
    export const fallbackLocale = writable<string>("en");
    /** The currently displayed locale. */
    export const locale = writable<string>("Loading");

    /** The type of the translate function. */
    type translateFunctionType = (path: string, defaultValue?: string) => string;
    /** The translate function. */
    export const t = derived<ReturnType<typeof writable>, translateFunctionType>(locale, () => {
        return function (path: string, defaultValue?: string): string {
            return getTranslation(path, defaultValue);
        }
    });

    /** alias for t (translate) */
    export const _ = t;
    /** alias for t */
    export const translate = t;
}

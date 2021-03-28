declare module "s20n" {
    import { SvelteComponentTyped } from 'svelte';

    /** The props that can be passed to the S20n component. */
    export interface S20nProps {
        /** An array of locales to load asynchronously. Note that they will all be loaded at once. */
        locales: localeType[];
        /** Default loaded language. */
        current?: string;
    }
    /** The S20n component provides internationalization for a Svelte app. */
    export default class S20n extends SvelteComponentTyped<S20nProps> { }

    /** Describes a locale with the path to its json file and its name. */
    export type localeType = {path: string, name: string};

    import { Writable, Readable } from 'svelte/store';

    /** The locale to fallback to if the current locale doesn't contain the requested translation. */
    export const fallbackLocale: Writable<string>;
    /** The currently displayed locale. */
    export const locale: Writable<string>;

    /** The type of the translate function. */
    type translateFunctionType = (path: string, defaultValue?: string) => string;
    /** The translate function. */
    export const t: Readable<string>;

    /** alias for t (translate) */
    export const _: typeof t;
    /** alias for t */
    export const translate: typeof t;
}

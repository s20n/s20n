/** A language name and a path for a translation file. */
export interface LanguageFile {
    /** The path to the file containing the language's data. */
    path: string;
    /** The language code. Standard language codes available [here](https://www.loc.gov/standards/iso639-2/php/code_list.php). */
    name: string;
}

/** A recursive type for a string tree. Contains the translation data. */
export interface TranslationData {
    /** A string TranslationData object. */
    [key: string]: string;
}

/** A locale with its data. */
export interface Locale extends LanguageFile {
    /** The translation data. When set to null, this should mean that the object hasn't been loaded yet. */
    data: TranslationData | null;
}

/** A mapped type for Locales */
export interface Locales {
    /** The Locale for the said type. */
    [key: string]: Omit<Locale, "name">;
}

/**
 * Make all properties in a type optional.
 *
 * Useful for function options.
 */

export type Optionalize<Type> = {
    [property in keyof Type]+?: Type[property];
};

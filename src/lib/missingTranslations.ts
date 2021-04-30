import { customWritable } from "./customStore";
import type { CustomWritable } from "./customStore";
import type { TranslationData } from "./types";

/** Describes a string and a locale in which it has no translation */
type UntranslatedString = {
    /** The locale in which this string is not translated. */
    locale: string;
    /** The untranslated string */
    untranslated: string;
}

/** The data that has no translation */
type MissingData = {
    /** The last untranslated string */
    last: UntranslatedString;

    [key: string]: TranslationData;
}

export const missingTranslations: CustomWritable<MissingData>
     = customWritable({last: { locale: "", untranslated: "" }})

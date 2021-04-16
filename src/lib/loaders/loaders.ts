import type { TranslationData } from "../types";
import { JSONLoader } from "./json";

/**
 * Represents a loader.
 *
 * For example, the json loader is defined like this:
 *
 * ```typescript
 * export const JSONLoader: Loader = {
 *     extension: ".json",
 *     handle: async function handler(r: Response): Promise<TranslationData | null> {
 *         return r.text()
 *             .then((t: string) => JSON.parse(t));
 *     }
 * }
 * ```
 */
export interface Loader {
    /**
     * The extension that this Loader will match.
     *
     * For example, the json loader has ".json" as extension.
     *
     * This can also be a RegExp. In which case this loader will be used if it matches the regular expression.
     */
    extension: string | RegExp;

    /**
     * The function that transforms the data returned from the server into an object.
     *
     * It takes a  Response and should return a Promise for Translation data.
     */
    handle: (response: Response) => Promise<TranslationData | null>;
}

let loaders: Loader[] = [
    JSONLoader,
];


/**
 * Load a file using one of the configured loaders.
 * @param path The path to the file to load
 * @returns A promise with the translation data or nothing if an error ocurred or no loader could be used to load that file type.
 */
export async function load(path: string): Promise<TranslationData | null> {
    return fetch(path).then((r: Response) => {
        for (const l of loaders) {
            if (typeof l.extension === "string") {
                if (path.endsWith(l.extension)) {
                    return l.handle(r);
                }
            }
            else if (l.extension instanceof RegExp) {
                if (path.match(l.extension)) {
                    return l.handle(r);
                }
            }
        }
        console.error("S20n: load: No Loader can load file " + path + ". Consider using `registerLoader` to read custom file types.")
        return null;
    })
}


/**
 * Register a loader for use in your application.
 * @param loader The loader to register
 */
export function registerLoader(loader: Loader) {
    if (loader) {
        loaders.push(loader);
    }
    else {
        console.error("S20n: registerLoader: invalid loader with value of: ", loader);
    }
}

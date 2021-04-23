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
     * A regexp or a string (the file's extension) to match the filename.
     *
     * The JSON loader uses `".json"` as its matcher.
     */
    matcher: string | RegExp;

    /**
     * The function that transforms the data returned from the server into an object.
     *
     * It takes the input filename and should return a Promise for Translation data or null
     * if the filename is invalid.
     */
    handle: (filename: string) => Promise<TranslationData | null>;
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
    for (const l of loaders) {
        if (typeof l.matcher === "string") {
            if (path.endsWith(l.matcher)) {
                return l.handle(path);
            }
        }
        else if (l.matcher instanceof RegExp) {
            if (path.match(l.matcher)) {
                return l.handle(path);
            }
        }
    }
    console.error("S20n: load: No Loader can load file " + path + ". Consider using `registerLoader` to read custom file types.")
    return Promise.resolve().then(() => null);
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

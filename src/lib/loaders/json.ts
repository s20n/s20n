import type { TranslationData } from "../types";
import type { Loader } from "./loaders";

export const JSONLoader: Loader = {
    matcher: ".json",
    handle: async function handler(path: string): Promise<TranslationData | null> {
        return fetch(path).then((r: Response) => r.json());
    }
}

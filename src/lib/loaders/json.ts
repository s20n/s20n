import { TranslationData } from "../types";
import { Loader } from "./loaders";

export const JSONLoader: Loader = {
    extension: ".json",
    handle: async function handler(r: Response): Promise<TranslationData | null> {
        return r.text()
            .then((t: string) => JSON.parse(t));
    }
}
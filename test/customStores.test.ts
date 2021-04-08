import { noop, subscribe } from "svelte/internal";
import { customWritable } from "../src/lib/customStores"

test("custom writable to have a working get() accessor", () => {
    const c = customWritable("my string");
    expect(c.get()).toEqual("my string");

    c.set("other string");
    expect(c.get()).toEqual("other string");
})

test("custom writable to have a working before set function", () => {
    let a = 0;
    const c = customWritable<number>(1, noop, async (v: number): Promise<void> => {
        expect(v).toEqual(2);
        a = 3;
    })
    c.set(2);
    subscribe(c, (v: number) => {
        expect(a).toEqual(3);
    })();
})

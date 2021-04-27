/**
 * This variable contains the locale that you use inside your source files.
 *
 * @readonly
 *
 * **This variable remains unchanged after the original assignment in `initS20n`.**
 *
 * @example
 *
 * If you write your svelte code like that:
 *
 * ```svelte
 * <Tr t="Ma langue par défaut est le français."/>
 * ```
 *
 * Then you should set `sourceLocale` to "fr". (By setting `sourceLocale` in `s20nInit`)
 *
 * But if you write by default in english, you would need `sourceLocale` to be "en".
 * Note that "en" is the default value.
 */
export let sourceLocale: string = "en";

/**
 * Set the source locale.
 * Should not be done in any other place than the `initS20n` function.
 */
export function setSourceLocale(v: string): void {
    sourceLocale = v;
}

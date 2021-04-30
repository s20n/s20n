import { noop, safe_not_equal } from "svelte/internal";
import type { StartStopNotifier, Subscriber, Unsubscriber, Updater, Writable } from "svelte/store";

type Invalidator<T> = (value?: T) => void;
type SubscribeInvalidateTuple<T> = [Subscriber<T>, Invalidator<T>];

export type CustomWritable<T> = Writable<T> & {get: () => T};

const subscriber_queue: any = [];


/**
 * A writable whose value can be read and that can do things before sending notifications on `set`.
 *
 * @param value The start value
 * @param start Start and stop notifications for subscription
 * @param beforeSet A function that will be run before notifying subscribers about the new data.
 * @returns A CustomWritable object.
 */
export function customWritable<T>(value: T, start: StartStopNotifier<T> = noop, beforeSet?: (value: T) => Promise<void>): CustomWritable<T> {
	let stop: Unsubscriber | null;
	const subscribers: Array<SubscribeInvalidateTuple<T>> = [];

    function privateSet(new_value: T): void {
        value = new_value;
        if (stop) { // store is ready
            const run_queue = !subscriber_queue.length;
            for (let i = 0; i < subscribers.length; i += 1) {
                const s = subscribers[i];
                s[1]();
                subscriber_queue.push(s, value);
            }
            if (run_queue) {
                for (let i = 0; i < subscriber_queue.length; i += 2) {
                    subscriber_queue[i][0](subscriber_queue[i + 1]);
                }
                // clear cue
                subscriber_queue.length = 0;
            }
        }
    }

	/**
	 * Set the value and inform subscribers.
	 *
	 * Note that this function is async if a function was given to `beforeSet`.
	 */
	function set(new_value: T): void | Promise<void> {
		if (safe_not_equal(value, new_value)) {
            if (beforeSet) beforeSet(new_value).then(() => privateSet(new_value));
            else privateSet(new_value);
		}
	}

	function update(fn: Updater<T>): void {
		set(fn(value));
	}

	function subscribe(run: Subscriber<T>, invalidate: Invalidator<T> = noop): Unsubscriber {
		const subscriber: SubscribeInvalidateTuple<T> = [run, invalidate];
		subscribers.push(subscriber);
		if (subscribers.length === 1) {
			stop = start(set) || noop;
		}
		run(value);

		return () => {
			const index = subscribers.indexOf(subscriber);
			if (index !== -1) {
				subscribers.splice(index, 1);
			}
			if (subscribers.length === 0) {
                if (stop) stop();
				stop = null;
			}
		};
	}

    function get(): T {
        return value;
    }

	return { set, update, subscribe, get };
}

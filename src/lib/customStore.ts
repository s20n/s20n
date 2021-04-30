import { noop, safe_not_equal } from "svelte/internal";
import type { StartStopNotifier, Subscriber, Unsubscriber, Updater } from "svelte/store";

type Invalidator<T> = (value?: T) => void;
type SubscribeInvalidateTuple<T> = [Subscriber<T>, Invalidator<T>];

/**
 * A writable whose value can be read and that can do things before sending notifications on `set`.
 *
 * @param value The start value
 * @param start Start and stop notifications for subscription
 * @param beforeSet A function that will be run before notifying subscribers about the new data.
 * @returns A CustomWritable object.
 */
export class CustomWritable<T> {
	static subscriber_queue: any[] = [];

	private stop: Unsubscriber | null;
	public subscribers: Array<SubscribeInvalidateTuple<T>> = [];

	private privateSet(new_value: T): void {
        this.value = new_value;
        if (this.stop) { // store is ready
            const run_queue = !CustomWritable.subscriber_queue.length;
            for (let i = 0; i < this.subscribers.length; i += 1) {
                const s = this.subscribers[i];
                s[1]();
                CustomWritable.subscriber_queue.push(s, this.value);
            }
            if (run_queue) {
                for (let i = 0; i < CustomWritable.subscriber_queue.length; i += 2) {
                    CustomWritable.subscriber_queue[i][0](CustomWritable.subscriber_queue[i + 1]);
                }
                // clear cue
                CustomWritable.subscriber_queue.length = 0;
            }
        }
    }

	constructor(private value: T, private start: StartStopNotifier<T> = noop, private beforeSet?: (value: T) => Promise<void>) {}

	/**
	 * Set the value and inform subscribers.
	 *
	 * Note that this function is async if a function was given to `beforeSet`.
	 */
	public set(new_value: T): void | Promise<void> {
		if (safe_not_equal(this.value, new_value)) {
			if (this.beforeSet) this.beforeSet(new_value).then(() => this.privateSet(new_value));
			else this.privateSet(new_value);
		}
	}

	public update(fn: Updater<T>): void {
		this.set(fn(this.value));
	}

	public subscribe(run: Subscriber<T>, invalidate: Invalidator<T> = noop): Unsubscriber {
		const subscriber: SubscribeInvalidateTuple<T> = [run, invalidate];
		this.subscribers.push(subscriber);
		if (this.subscribers.length === 1) {
			this.stop = this.start(this.set) || noop;
		}
		run(this.value);

		return () => {
			const index = this.subscribers.indexOf(subscriber);
			if (index !== -1) {
				this.subscribers.splice(index, 1);
			}
			if (this.subscribers.length === 0) {
                if (this.stop) this.stop();
				this.stop = null;
			}
		};
	}

	public get(): T {
		return this.value;
	}
}

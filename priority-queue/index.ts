export type ComparatorFn<T> = (a: T, b: T) => number;

export type PriorityQueueParams<T> = {
	comparatorFn: ComparatorFn<T>,
	intialValues?: Array<T>,
};

export type Optional<T> = T | null;

export class PriorityQueue<T> {
	values: Array<T> = [];
	comparatorFn: ComparatorFn<T>;
	length: 0

	constructor(params: PriorityQueueParams<T>) {
	}

	insert(value: T) {
	}

	remove(): Optional<T> {
		return null;
	}
}

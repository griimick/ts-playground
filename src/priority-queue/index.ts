export type ComparatorFn<T> = (a: T, b: T) => number;

export type PriorityQueueParams<T> = {
	comparatorFn: ComparatorFn<T>,
	intialValues?: Array<T>,
};

export type Optional<T> = T | null;

export class PriorityQueue<T> {
	values: Array<T> = [];
	comparatorFn: ComparatorFn<T>;
	length = 0;

	constructor(params: PriorityQueueParams<T>) {
		this.comparatorFn = params.comparatorFn;

		if (params.intialValues) {
			params.intialValues.forEach(value => this.insert(value));
		}
	}

	insert(value: T) {
		// naive way of increasing the capacity 
		// remind me of the college days when we were doing 
		// this in C programming
		if (this.values.length <= this.length) {
			this.values.length = Math.max(1, this.values.length * 2);
		}

		this.values[this.length] = value;
		this.length++;
		
		// check if the new insertion is in correct place
		this.bubbleUp();
	}

	remove(): Optional<T> {
		if (this.length === 0) return null;

		const node = this.values[0];

		if (this.length === 1) {
			this.length = 0;
			this.values[0] = null;
			return node;
		}

		this.values[0] = this.values[this.length - 1];
		this.values[this.length - 1] = null;
		this.length--;

		this.bubbleDown();

		return node;
	}

	parent(nodeIndex: number) {
		if (nodeIndex === 0) return null;
		return (nodeIndex - 1) >>> 1; // right shift by 1 i.e. divide by 2 and round down
	}

	leftChild(nodeIndex: number) {
		const child = (nodeIndex * 2) + 1;
		if (child >= this.length) return null;
		return child;
	}

	rightChild(nodeIndex: number) {
		const child = (nodeIndex * 2) + 2;
		if (child >= this.length) return null;
		return child;
	}

	bubbleUp() {
		let index = this.length - 1;

		while (true) {
			const parent = this.parent(index);

			if (parent !== null && this.comparatorFn(this.values[index], this.values[parent]) < 0) {
				//console.log('swapping', this.values[index], this.values[parent]);
				const tmp = this.values[index];
				this.values[index] = this.values[parent];
				this.values[parent] = tmp;
				index = parent;
				continue;
			}

			// stop when we don't need to swap anymore
			return;
		}
	}

	bubbleDown() {
		let index = 0;

		while (true) {
			const left = this.leftChild(index);
			const right = this.rightChild(index);

			let swapCandidate = index;

			if (left !== null && this.comparatorFn(this.values[swapCandidate], this.values[left]) > 0) {
				swapCandidate = left;
			}

			if (right !== null && this.comparatorFn(this.values[swapCandidate], this.values[right]) > 0) {
				swapCandidate = left;
			}

			if (swapCandidate !== index) {
				const tmp = this.values[index];
				this.values[index] = this.values[swapCandidate];
				this.values[swapCandidate] = tmp;
				index = swapCandidate;
				continue;
			}

			return;
		}
	}

	heapsort () {
		return Array.from({ length: this.length }, () => this.remove());	
	}
}


const pqueue = new PriorityQueue({
	comparatorFn: (a ,b) => a - b,
	intialValues: [32, 5, 44, 10, 1],
});

console.log(pqueue.heapsort());
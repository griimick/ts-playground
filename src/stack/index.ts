export type StackParams<T> = {
	initialValues: Array<T>,
}

export class Stack<T> {

	private elements: Array<T> = [];

	constructor(params: StackParams<T>) {
		this.elements = params.initialValues;
	}

	public isEmpty(): boolean {
		return this.elements.length === 0;
	}

	public size(): number {
		return this.elements.length;
	}

	public peek(): T | null {
		if (this.isEmpty()) return null;
		return this.elements[this.size() - 1];

	}

	public push(element: T) {
		this.elements.push(element);
	} 

	public pop(): T | null {
		if (this.isEmpty()) return null;

		return this.elements.pop();
	} 

	public toArray(): Array<T>{
		return this.elements.slice();
	}

	public clear() {
		this.elements = [];
	}

	public clone(): Stack<T> {
		return new Stack({ initialValues: this.elements });
	}

	public static fromArray(elements: Array<any>): Stack<any> {
		return new Stack({ initialValues: elements });

	}


}
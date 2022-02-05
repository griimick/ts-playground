export declare type StackParams<T> = {
    initialValues: Array<T>;
};
export declare class Stack<T> {
    private elements;
    constructor(params: StackParams<T>);
    isEmpty(): boolean;
    size(): number;
    peek(): T | null;
    push(element: T): void;
    pop(): T | null;
    toArray(): Array<T>;
    clear(): void;
    clone(): Stack<T>;
    static fromArray(elements: Array<any>): Stack<any>;
}

export declare type ComparatorFn<T> = (a: T, b: T) => number;
export declare type PriorityQueueParams<T> = {
    comparatorFn: ComparatorFn<T>;
    intialValues?: Array<T>;
};
export declare type Optional<T> = T | null;
export declare class PriorityQueue<T> {
    private values;
    private comparatorFn;
    private length;
    constructor(params: PriorityQueueParams<T>);
    insert(value: T): void;
    remove(): Optional<T>;
    heapsort(): T[];
    private parent;
    private leftChild;
    private rightChild;
    private bubbleUp;
    private bubbleDown;
}

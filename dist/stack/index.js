"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
class Stack {
    elements = [];
    constructor(params) {
        this.elements = params.initialValues;
    }
    isEmpty() {
        return this.elements.length === 0;
    }
    size() {
        return this.elements.length;
    }
    peek() {
        if (this.isEmpty())
            return null;
        return this.elements[this.size() - 1];
    }
    push(element) {
        this.elements.push(element);
    }
    pop() {
        if (this.isEmpty())
            return null;
        return this.elements.pop();
    }
    toArray() {
        return this.elements.slice();
    }
    clear() {
        this.elements = [];
    }
    clone() {
        return new Stack({ initialValues: this.elements });
    }
    static fromArray(elements) {
        return new Stack({ initialValues: elements });
    }
}
exports.Stack = Stack;

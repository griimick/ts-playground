"use strict";
exports.__esModule = true;
exports.Stack = void 0;
var Stack = /** @class */ (function () {
    function Stack(params) {
        this.elements = [];
        this.elements = params.initialValues;
    }
    Stack.prototype.isEmpty = function () {
        return this.elements.length === 0;
    };
    Stack.prototype.size = function () {
        return this.elements.length;
    };
    Stack.prototype.peek = function () {
        if (this.isEmpty())
            return null;
        return this.elements[this.size() - 1];
    };
    Stack.prototype.push = function (element) {
        this.elements.push(element);
    };
    Stack.prototype.pop = function () {
        if (this.isEmpty())
            return null;
        return this.elements.pop();
    };
    Stack.prototype.toArray = function () {
        return this.elements.slice();
    };
    Stack.prototype.clear = function () {
        this.elements = [];
    };
    Stack.prototype.clone = function () {
        return new Stack({ initialValues: this.elements });
    };
    Stack.fromArray = function (elements) {
        return new Stack({ initialValues: elements });
    };
    return Stack;
}());
exports.Stack = Stack;

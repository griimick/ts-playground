"use strict";
exports.__esModule = true;
exports.PriorityQueue = void 0;
var PriorityQueue = /** @class */ (function () {
    function PriorityQueue(params) {
        var _this = this;
        this.values = [];
        this.length = 0;
        this.comparatorFn = params.comparatorFn;
        if (params.intialValues) {
            params.intialValues.forEach(function (value) { return _this.insert(value); });
        }
    }
    PriorityQueue.prototype.insert = function (value) {
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
    };
    PriorityQueue.prototype.remove = function () {
        if (this.length === 0)
            return null;
        var node = this.values[0];
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
    };
    PriorityQueue.prototype.heapsort = function () {
        var _this = this;
        return Array.from({ length: this.length }, function () { return _this.remove(); });
    };
    PriorityQueue.prototype.parent = function (nodeIndex) {
        if (nodeIndex === 0)
            return null;
        return (nodeIndex - 1) >>> 1; // right shift by 1 i.e. divide by 2 and round down
    };
    PriorityQueue.prototype.leftChild = function (nodeIndex) {
        var child = (nodeIndex * 2) + 1;
        if (child >= this.length)
            return null;
        return child;
    };
    PriorityQueue.prototype.rightChild = function (nodeIndex) {
        var child = (nodeIndex * 2) + 2;
        if (child >= this.length)
            return null;
        return child;
    };
    PriorityQueue.prototype.bubbleUp = function () {
        var index = this.length - 1;
        while (true) {
            var parent_1 = this.parent(index);
            if (parent_1 !== null && this.comparatorFn(this.values[index], this.values[parent_1]) < 0) {
                //console.log('swapping', this.values[index], this.values[parent]);
                var tmp = this.values[index];
                this.values[index] = this.values[parent_1];
                this.values[parent_1] = tmp;
                index = parent_1;
                continue;
            }
            // stop when we don't need to swap anymore
            return;
        }
    };
    PriorityQueue.prototype.bubbleDown = function () {
        var index = 0;
        while (true) {
            var left = this.leftChild(index);
            var right = this.rightChild(index);
            var swapCandidate = index;
            if (left !== null && this.comparatorFn(this.values[swapCandidate], this.values[left]) > 0) {
                swapCandidate = left;
            }
            if (right !== null && this.comparatorFn(this.values[swapCandidate], this.values[right]) > 0) {
                swapCandidate = right;
            }
            if (swapCandidate !== index) {
                var tmp = this.values[index];
                this.values[index] = this.values[swapCandidate];
                this.values[swapCandidate] = tmp;
                index = swapCandidate;
                continue;
            }
            return;
        }
    };
    return PriorityQueue;
}());
exports.PriorityQueue = PriorityQueue;
var pqueue = new PriorityQueue({
    comparatorFn: function (a, b) { return a - b; },
    intialValues: [32, 5, 44, 10, 1]
});
console.log(pqueue.heapsort());

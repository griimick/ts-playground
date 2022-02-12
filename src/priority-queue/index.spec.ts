import { PriorityQueue } from './index';
import { expect } from 'chai';
import 'mocha';

describe('test cases for priority queue', () => {
	it('sort a random array', () => {
		let input = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10));
		let output = input.sort((a: number ,b: number): number => a - b);
		let queue = new PriorityQueue({
			comparatorFn: (a: number,b: number): number => a - b,
			initialValues: input,
		});
		expect(queue.heapsort()).to.deep.equal(output);
	});

});

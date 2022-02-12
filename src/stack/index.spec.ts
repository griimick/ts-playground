import { Stack } from './index';
import { expect } from 'chai';
import 'mocha';

describe('test cases for stack', () => {
	it('inset a few numbers and peek', () => {
		let input: Array<number> = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10));
		let output: number = input[input.length - 1];
		let queue = new Stack({
			initialValues: input,
		});
		expect(queue.peek()).to.deep.equal(output);
	});

});

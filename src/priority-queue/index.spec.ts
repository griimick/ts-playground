import { expect } from 'chai';
import 'mocha';

describe('Hello function', () => {

	it('should return hello world', () => {
		let result = 'Hello world!';
		expect(result).to.equal('Hello world!');
	});

});

/* tslint:disable: no-magic-numbers */
import {
	textTructate
} from './textTruncate';

describe('helpers', () => {

	describe('textTruncate', () => {

		it('should truncate text', () => {

			expect(
				textTructate('some long text', 4)
			).toBe(
				'some...'
			);
		});

		it('should truncate text by space', () => {

			expect(
				textTructate('some long text', 6)
			).toBe(
				'some...'
			);
		});

		it('should not truncate shirt text', () => {

			expect(
				textTructate('something', 20)
			).toBe(
				'something'
			);
		});
	});
});

import {
	blockScroll
} from '../../helpers';

/**
 * Toggle scroll blocking.
 * @param  active - Current state.
 * @param  unblockScroll - Unblock scroll function.
 * @param  element - Element to block scroll.
 * @return New unblock scroll function or null.
 */
export default function toggleScrollBlock(
	active: boolean,
	unblockScroll: () => void,
	element = document.body
) {

	const scrollBlocked = typeof unblockScroll === 'function';

	if (active) {

		if (scrollBlocked) {
			unblockScroll();
		}

		return blockScroll(element);

	}

	if (scrollBlocked) {
		unblockScroll();
	}

	return null;
}

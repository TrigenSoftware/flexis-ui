import { blockScroll } from '../../helpers';

/**
 * Toggle scroll blocking.
 * @param  {Boolean}       active - Current state.
 * @param  {Function|null} unblockScroll - Unblock scroll function.
 * @param  {HTMLElement}   element - Element to block scroll.
 * @return {Function|null} New unblock scroll function or null.
 */
export default function toggleScrollBlock(active, unblockScroll, element = document.body) {

	const scrollBlocked = typeof unblockScroll == 'function';

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

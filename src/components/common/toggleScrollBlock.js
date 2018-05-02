
import { blockScroll } from '../../helpers';

/**
 * Toggle scroll blocking.
 * @param {Boolean}        active - Current state.
 * @param {Function|null}  unblockScroll - Unblock scroll function.
 * @return {Function|null} New unblock scroll function or null.
 */
export default function toggleScrollBlock(active, unblockScroll) {

	const scrollBlocked = typeof unblockScroll == 'function';

	if (active) {

		if (scrollBlocked) {
			unblockScroll();
		}

		return blockScroll(document.body);

	}

	if (scrollBlocked) {
		unblockScroll();
	}

	return null;
}

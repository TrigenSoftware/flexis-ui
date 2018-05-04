import { ariaHide } from '../../helpers';

/**
 * Toggle `aria-hidden`.
 * @param  {Boolean}       active - Current state.
 * @param  {Function|null} ariaShow - Remove `aria-hidden` function.
 * @param  {HTMLElement}   element - Element to block scroll.
 * @return {Function|null} New remove `aria-hidden` function or null.
 */
export default function toggleAriaHide(active, ariaShow, element) {

	const ariaHidden = typeof ariaShow == 'function';

	if (active) {

		if (ariaHidden) {
			ariaShow();
		}

		return ariaHide(element);

	}

	if (ariaHidden) {
		ariaShow();
	}

	return null;
}

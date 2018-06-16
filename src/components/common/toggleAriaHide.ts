import { ariaHide } from '../../helpers';

/**
 * Toggle `aria-hidden`.
 * @param  active - Current state.
 * @param  ariaShow - Remove `aria-hidden` function.
 * @param  element - Element to block scroll.
 * @return New remove `aria-hidden` function or null.
 */
export default function toggleAriaHide(
	active: boolean,
	ariaShow: () => void,
	element: HTMLElement
) {

	const ariaHidden = typeof ariaShow === 'function';

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

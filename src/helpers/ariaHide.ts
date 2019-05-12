
const {
	setAttribute,
	removeAttribute
} = HTMLElement.prototype;

/**
 * Add `aria-hidden` attribute.
 * @param  element - HTML-element to add `aria-hidden` attribute.
 * @return Remove `aria-hidden` attribute.
 */
export function ariaHide(element: HTMLElement) {

	const unhide: () => void = element.hasAttribute('aria-hidden')
		? setAttribute.bind(element, 'aria-hidden', element.getAttribute('aria-hidden'))
		: removeAttribute.bind(element, 'aria-hidden');

	element.setAttribute('aria-hidden', 'true');

	return unhide;
}

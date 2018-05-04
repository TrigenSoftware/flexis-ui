/**
 * Add `aria-hidden` attribute.
 * @param  {HTMLElement} element - HTML-element to add `aria-hidden` attribute.
 * @return {Function}    Remove `aria-hidden` attribute.
 */
export default function ariaHide(element) {

	element.setAttribute('aria-hidden', true);

	return element.removeAttribute.bind(element, 'aria-hidden');
}

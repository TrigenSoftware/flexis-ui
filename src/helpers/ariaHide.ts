/**
 * Add `aria-hidden` attribute.
 * @param  element - HTML-element to add `aria-hidden` attribute.
 * @return Remove `aria-hidden` attribute.
 */
export default function ariaHide(element: HTMLElement): () => void {

	element.setAttribute('aria-hidden', 'true');

	return element.removeAttribute.bind(element, 'aria-hidden');
}

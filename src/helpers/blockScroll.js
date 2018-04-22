/**
 * Block scroll.
 * @param  {HTMLElement} element - HTML-element to block scroll.
 * @return {Function}    Unblock scroll.
 */
export default function blockScroll(element = document.body) {

	const {
		documentElement
	} = document;

	let currentElement = element,
		restore = [];

	do {

		restore.push([
			currentElement,
			currentElement.style.overflow
		]);

		currentElement.style.overflow = 'hidden';
		currentElement = currentElement.parentElement;

	} while (currentElement != documentElement);

	currentElement = null;

	return () => {
		restore.forEach(([element, overflow]) => {
			element.style.overflow = overflow;
		});
		restore = null;
	};
}

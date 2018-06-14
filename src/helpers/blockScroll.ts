/**
 * Block scroll.
 * @param  element - HTML-element to block scroll.
 * @return Unblock scroll.
 */
export default function blockScroll(element = document.body) {

	const {
		documentElement
	} = document;

	let currentElement = element;
	let restore: [HTMLElement, string][] = [];

	do {

		restore.push([
			currentElement,
			currentElement.style.overflow
		]);

		currentElement.style.overflow = 'hidden';
		currentElement = currentElement.parentElement;

	} while (currentElement !== documentElement);

	currentElement = null;

	return () => {

		if (restore === null) {
			return;
		}

		restore.forEach(([element, overflow]) => {
			element.style.overflow = overflow;
		});
		restore = null;
	};
}

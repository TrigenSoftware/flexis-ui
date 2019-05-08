
interface IElementOverflow {
	count: number;
	value: string;
}

const elementsOverflows = new Map<HTMLElement, IElementOverflow>();

function blockElement(element: HTMLElement) {

	const overflow = elementsOverflows.get(element);

	if (overflow) {
		overflow.count++;
	} else {
		elementsOverflows.set(element, {
			count:    1,
			value: element.style.overflow
		});
		element.style.overflow = 'hidden';
	}
}

function unblockElement(element: HTMLElement) {

	const overflow = elementsOverflows.get(element);

	if (!overflow) {
		return;
	}

	overflow.count--;

	if (!overflow.count) {
		element.style.overflow = overflow.value;
		elementsOverflows.delete(element);
	}
}

/**
 * Block scroll.
 * @param  element - HTML-element to block scroll.
 * @return Unblock scroll.
 */
export function blockScroll(element = document.body) {

	const {
		documentElement
	} = document;
	let currentElement = element;
	let restore: HTMLElement[] = [];

	do {

		restore.push(currentElement);
		blockElement(currentElement);

		currentElement = currentElement.parentElement;

	} while (currentElement !== documentElement);

	currentElement = null;

	return () => {

		if (restore === null) {
			return;
		}

		restore.forEach(unblockElement);
		restore = null;
	};
}

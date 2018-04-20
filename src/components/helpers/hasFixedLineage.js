
export default function hasFixedLineage(sourceElement) {

	const { getComputedStyle } = global;

	let element = sourceElement,
		position = '';

	do {

		position = getComputedStyle(element)
			.getPropertyValue('position');

		if (position == 'fixed') {
			return true;
		}

		element = element.parentElement;

	} while (element.tagName != 'HTML');

	return false;
}

/**
 * Toggle scroll blocking.
 * @param active - Current state.
 * @param attributeName - Attribute name.
 * @param element - Element to set attribute.
 */
export default function toggleAttribute(
	active: boolean,
	attributeName: string,
	element: HTMLElement
) {

	if (active) {
		element.setAttribute(attributeName, 'true');
	} else {
		element.removeAttribute(attributeName);
	}
}

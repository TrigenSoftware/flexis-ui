/**
 * Move element from overflow.
 * @param  element - Element to set position.
 * @param  positionTop - Top position of element.
 * @param  positionLeft - Left position of element.
 */
export default function setOverflowOffset(
	element: HTMLElement,
	positionTop: number,
	positionLeft: number
) {

	const {
		clientWidth,
		clientHeight
	} = document.documentElement;
	const {
		style
	} = element;
	const {
		top,
		left,
		width,
		height
	} = element.getBoundingClientRect();
	const right = clientWidth - (left + width);
	const bottom = clientHeight - (top + height);

	if (top < 0) {
		style.top = `${positionTop - top}px`;
	} else
	if (bottom < 0) {
		style.top = `${positionTop + bottom}px`;
	}

	if (right < 0) {
		style.left = `${positionLeft + right}px`;
	} else
	if (left < 0) {
		style.left = `${positionLeft - left}px`;
	}
}

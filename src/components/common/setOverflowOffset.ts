/**
 * Move element from overflow.
 * @param  element - Element to set position.
 * @param  positionTop - Top position of element.
 * @param  positionLeft - Left position of element.
 * @return Overflow offset was set or not.
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
	let withOverflowOffset = false;

	if (top < 0) {
		style.top = `${positionTop - top}px`;
		withOverflowOffset = true;
	} else
	if (bottom < 0) {
		style.top = `${positionTop + bottom}px`;
		withOverflowOffset = true;
	}

	if (right < 0) {
		style.left = `${positionLeft + right}px`;
		withOverflowOffset = true;
	} else
	if (left < 0) {
		style.left = `${positionLeft - left}px`;
		withOverflowOffset = true;
	}

	return withOverflowOffset;
}

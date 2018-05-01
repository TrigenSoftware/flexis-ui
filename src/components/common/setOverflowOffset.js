/**
 * Move element from overflow.
 * @param  {HTMLElement} element - Element to set position.
 * @param  {Number}      positionTop - Top position of element.
 * @param  {Number}      positionLeft - Left position of element.
 * @return {void}
 */
export default function setOverflowOffset(element, positionTop, positionLeft) {

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

	const right = clientWidth - (left + width),
		bottom = clientHeight - (top + height);

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

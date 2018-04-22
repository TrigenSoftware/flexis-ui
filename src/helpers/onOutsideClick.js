/**
 * Subscribe to outside element click.
 * @param  {Function} getElementRef - Function to get HTML-element reference.
 * @param  {Function} listener - Outside click listener.
 * @return {Function} Unsubscribe from outside click event.
 */
export default function onOutsideClick(getElementRef, listener) {

	if (typeof document == 'undefined') {
		return () => {};
	}

	const listenerWrapper = (event) => {

		const node = getElementRef();

		if (!node.contains(event.target)) {
			listener(event);
		}
	};

	document.addEventListener('click', listenerWrapper, false);

	return () => {
		document.removeEventListener('click', listenerWrapper, false);
	};
}

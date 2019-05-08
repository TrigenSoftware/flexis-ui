
const {
	removeEventListener
} = HTMLElement.prototype;

/**
 * Subscribe to UI event.
 * @param  element - Target element.
 * @param  eventName - Event name to subscribe.
 * @param  listener - Event listener.
 * @param  useCapture - Capture phase or bubble.
 * @return Unsubscribe from event.
 */
export function subscribeEvent(
	element: HTMLElement|Document,
	eventName: string,
	listener: (event?: Event) => void,
	useCapture = false
): () => void {

	element.addEventListener(eventName, listener, useCapture);

	return removeEventListener.bind(element, eventName, listener, useCapture);
}

/**
 * Subscribe to UI event.
 * @param  {HTMLElement} element - Target element.
 * @param  {String}      eventName - Event name to subscribe.
 * @param  {Function}    listener - Event listener.
 * @param  {Boolean}     useCapture - Capture phase or bubble.
 * @return {Function}    Unsubscribe from event.
 */
export default function subscribeEvent(element, eventName, listener, useCapture = false) {

	element.addEventListener(eventName, listener, useCapture);

	return () => {
		element.removeEventListener(eventName, listener, useCapture);
	};
}

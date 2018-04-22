import throttle from 'throttle-debounce/throttle';

/**
 * Decortor for throttlify class method.
 * @param  {Number}   delay - Throttle delay in ms.
 * @param  {Boolean}  noTrailing - No trailing call.
 * @return {Function} Method decorator.
 */
export default function Throttle(delay, noTrailing = false) {
	return (target, key, descriptor) => {
		descriptor.value = throttle(delay, noTrailing, descriptor.value);
	};
}

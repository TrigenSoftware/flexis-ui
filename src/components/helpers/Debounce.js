import debounce from 'throttle-debounce/debounce';

/**
 * Decortor for debouncify class method.
 * @param  {Number}   delay - Debounce delay in ms.
 * @param  {Boolean}  atBegin - Call at begin.
 * @return {Function} Method decorator.
 */
export default function Debounce(delay, atBegin = false) {
	return (target, key, descriptor) => {
		descriptor.value = debounce(delay, atBegin, descriptor.value);
	};
}

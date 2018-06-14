import debounce from 'throttle-debounce/debounce';

/**
 * Decortor for debouncify class method.
 * @param  delay - Debounce delay in ms.
 * @param  atBegin - Call at begin.
 * @return Method decorator.
 */
export default function Debounce(delay: number, atBegin = false): MethodDecorator {
	return (target, key, descriptor: PropertyDescriptor) => {
		descriptor.value = debounce(delay, atBegin, descriptor.value);
	};
}

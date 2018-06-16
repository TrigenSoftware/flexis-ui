import throttle from 'throttle-debounce/throttle';

/**
 * Decortor for throttlify class method.
 * @param  delay - Throttle delay in ms.
 * @param  noTrailing - No trailing call.
 * @return Method decorator.
 */
export function Throttle(delay: number, noTrailing = false): MethodDecorator {
	return (target, key, descriptor: PropertyDescriptor) => {
		descriptor.value = throttle(delay, noTrailing, descriptor.value, false);
	};
}

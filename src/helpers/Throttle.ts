import {
	throttle
} from 'throttle-debounce';
import {
	Bind
} from './Bind';

/**
 * Decortor for throttlify class method.
 * @param  delay - Throttle delay in ms.
 * @param  noTrailing - No trailing call.
 * @return Method decorator.
 */
export function Throttle(delay: number, noTrailing = false): MethodDecorator {
	return (_, __, descriptor: PropertyDescriptor) => {
		descriptor.value = throttle(delay, noTrailing, descriptor.value, false);
		Bind()(_, __, descriptor);
	};
}

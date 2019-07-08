import {
	debounce
} from 'throttle-debounce';
import {
	Bind
} from './Bind';

/**
 * Decortor for debouncify class method.
 * @param  delay - Debounce delay in ms.
 * @param  atBegin - Call at begin.
 * @return Method decorator.
 */
export function Debounce(delay: number, atBegin = false): MethodDecorator {
	return (_, __, descriptor: PropertyDescriptor) => {
		descriptor.value = debounce(delay, atBegin, descriptor.value);
		Bind()(_, __, descriptor);
	};
}

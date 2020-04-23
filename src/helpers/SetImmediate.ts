import {
	Bind
} from './Bind';

/**
 * Decortor for wrap class method around `setImmediate`.
 * @return Method decorator.
 */
export function SetImmediate(): MethodDecorator {
	return (_, __, descriptor: PropertyDescriptor) => {
		descriptor.value = setImmediate(descriptor.value);
		Bind()(_, __, descriptor);
	};
}

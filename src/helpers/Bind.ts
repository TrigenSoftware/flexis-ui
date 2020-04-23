/**
 * Decortor for bind class method to context.
 * @return Method decorator.
 */
export function Bind(): MethodDecorator {
	return (_, key, descriptor: PropertyDescriptor) => {

		const method = descriptor.value;
		const bindedListenerKey = `__bindedListener(${String(key)})__`;

		Reflect.deleteProperty(descriptor, 'value');
		Reflect.deleteProperty(descriptor, 'writable');

		descriptor.get =
		function wrapper() {

			if (this.hasOwnProperty(bindedListenerKey)) {
				return this[bindedListenerKey];
			}

			const bindedListener = method.bind(this);

			this[bindedListenerKey] = bindedListener;

			return bindedListener;
		};
	};
}

/**
 * Decortor for bind class method to context.
 * @return Method decorator.
 */
export function Bind(): MethodDecorator {
	return (_, key, descriptor: PropertyDescriptor) => {

		const listener = descriptor.value;
		const bindedListenerKey = `__bindedListener(${String(key)})__`;

		Reflect.deleteProperty(descriptor, 'value');
		Reflect.deleteProperty(descriptor, 'writable');

		descriptor.get =
		function listenerWrapper() {

			if (this.hasOwnProperty(bindedListenerKey)) {
				return this[bindedListenerKey];
			}

			const bindedListener = listener.bind(this);

			this[bindedListenerKey] = bindedListener;

			return bindedListener;
		};

		return descriptor;
	};
}

/**
 * Decortor for debouncify class method.
 * @param  delay - Debounce delay in ms.
 * @param  atBegin - Call at begin.
 * @return Method decorator.
 */
export function Listener(): MethodDecorator {
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

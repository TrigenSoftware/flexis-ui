/**
 * Decortor for debouncify class method.
 * @param  delay - Debounce delay in ms.
 * @param  atBegin - Call at begin.
 * @return Method decorator.
 */
export function Listener(): MethodDecorator {
	return (target, key, descriptor: PropertyDescriptor) => {

		const listener = descriptor.value;
		const bindedListenerKey = `__bindedListener(${String(key)})__`;

		descriptor.value = null;
		descriptor.get =
		function listenerWrapper() {

			if (this.hasOwnProperty(bindedListenerKey)) {
				return this[bindedListenerKey];
			}

			const bindedListener = listener.bind(this);

			this[bindedListenerKey] = bindedListener;

			return bindedListener;
		};
	};
}

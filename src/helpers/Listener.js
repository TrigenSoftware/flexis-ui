/**
 * Decortor for debouncify class method.
 * @param  {Number}   delay - Debounce delay in ms.
 * @param  {Boolean}  atBegin - Call at begin.
 * @return {Function} Method decorator.
 */
export default function Listener() {
	return (target, key, descriptor) => {

		const listener = descriptor.value,
			bindedListenerKey = `__bindedListener(${key})__`;

		descriptor.value =
		function listenerWrapper(...args) {

			if (args.length) {
				return listener.bind(this, ...args);
			}

			if (this.hasOwnProperty(bindedListenerKey)) {
				return this[bindedListenerKey];
			}

			const bindedListener = listener.bind(this);

			this[bindedListenerKey] = bindedListener;

			return bindedListener;
		};
	};
}

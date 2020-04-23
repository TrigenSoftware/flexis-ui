/**
 * Decortor for wrap class method around `setImmediate`.
 * @return Method decorator.
 */
export function SetImmediate(): MethodDecorator {
	return (_, __, descriptor: PropertyDescriptor) => {

		const method = descriptor.value;

		descriptor.value =
		function wrapper(...args) {
			return new Promise((resolve, reject) => {
				setImmediate(() => {
					try {
						resolve(Reflect.apply(method, this, args));
					} catch (err) {
						reject(err);
					}
				});
			});
		};
	};
}

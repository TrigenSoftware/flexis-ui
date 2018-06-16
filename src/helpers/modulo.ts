/**
 * Modulo function.
 * @param  a - "Index"
 * @param  b - "Length"
 * @return "Index"
 */
export function modulo(a: number, b: number) {
	return (a % b + b) % b;
}

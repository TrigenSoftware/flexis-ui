/**
 * Modulo function.
 * @param  a - "Index"
 * @param  b - "Length"
 * @return "Index"
 */
export default function modulo(a: number, b: number) {
	return (a % b + b) % b;
}

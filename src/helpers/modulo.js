/**
 * Modulo function.
 * @param  {Number} a - "Index"
 * @param  {Number} b - "Length"
 * @return {Number} "Index"
 */
export default function modulo(a, b) {
	return (a % b + b) % b;
}

/**
 * Return value or `undefined`.
 * @param  {Object}  value - Value to check and maybe return.
 * @return {Boolean} Result of check.
 */
export function valueOrUndef(value) {
	return value == null
		? global.undefined
		: value;
}

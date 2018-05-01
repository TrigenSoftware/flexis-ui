/**
 * Get next value.
 * @param  {Boolean} multiple - Value is array or not.
 * @param  {Object}  value - Current value.
 * @param  {Object}  nextValue - Next value.
 * @return {Object}  Next value.
 */
export default function getNextValue(multiple, value, nextValue) {

	if (!multiple) {
		return nextValue;
	}

	const nextArrayValue = Array.isArray(value) ? [...value] : [],
		index = nextArrayValue.indexOf(nextValue);

	if (~index) {
		nextArrayValue.splice(index, 1);
	} else {
		nextArrayValue.push(nextValue);
	}

	return nextArrayValue;
}

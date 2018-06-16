/**
 * Get next value.
 * @param  multiple - Value is array or not.
 * @param  value - Current value.
 * @param  nextValue - Next value.
 * @return Next value.
 */
export default function getNextValue(
	multiple: boolean,
	value,
	nextValue
) {

	if (!multiple) {
		return nextValue;
	}

	const nextArrayValue = Array.isArray(value) ? [...value] : [];
	const index = nextArrayValue.indexOf(nextValue);

	if (~index) {
		nextArrayValue.splice(index, 1);
	} else {
		nextArrayValue.push(nextValue);
	}

	return nextArrayValue;
}

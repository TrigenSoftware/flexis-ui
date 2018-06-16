/**
 * Check is current value or not.
 * @param  multiple - Value is array or not.
 * @param  value - Current value.
 * @param  option - Value to check.
 * @return result
 */
export default function isCurrentValue(
	multiple: boolean,
	value,
	option
) {

	if (multiple) {

		if (Array.isArray(value)) {
			return value.includes(option);
		}

		return false;
	}

	return value === option;
}

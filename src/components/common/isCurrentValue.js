/**
 * Check is current value or not.
 * @param  {Boolean} multiple - Value is array or not.
 * @param  {Object}  value - Current value.
 * @param  {Object}  option - Value to check.
 * @return {void}
 */
export default function isCurrentValue(multiple, value, option) {

	if (multiple) {

		if (Array.isArray(value)) {
			return value.includes(option);
		}

		return false;
	}

	return value == option;
}

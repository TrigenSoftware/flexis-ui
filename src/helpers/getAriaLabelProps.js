/**
 * Get arial-label props.
 * @param  {Object} labelProps - Props with labels.
 * @param  {Object} selfProps - Props to check aria-attributes.
 * @return {Object} Aria-label props.
 */
export default function getAriaLabelProps({
	role,
	labelledBy,
	label
}, {
	role:              selfRole,
	'aria-labelledby': selfLabelledBy,
	'aria-label':      selfLabel
} = {}) {

	const props = {},
		roleProp = selfRole || role;

	if (typeof roleProp == 'string') {
		props.role = roleProp;
	}

	if (typeof selfLabelledBy == 'string') {
		props['aria-labelledby'] = selfLabelledBy;
	} else
	if (typeof selfLabel == 'string') {
		props['aria-label'] = selfLabel;
	} else
	if (typeof labelledBy == 'string') {
		props['aria-labelledby'] = labelledBy;
	} else
	if (typeof label == 'string') {
		props['aria-label'] = label;
	}

	return props;
}

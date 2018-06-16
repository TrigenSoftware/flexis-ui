
interface ILabelProps {
	role: string;
	labelledBy: string;
	label: string;
}

interface IAriaLabelProps {
	role?: string;
	['aria-labelledby']?: string;
	['aria-label']?: string;
}

/**
 * Get arial-label props.
 * @param  labelProps - Props with labels.
 * @param  selfProps - Props to check aria-attributes.
 * @return Aria-label props.
 */
export function getAriaLabelProps(
	{
		role,
		labelledBy,
		label
	}: ILabelProps,
	{
		role: selfRole = null,
		'aria-labelledby': selfLabelledBy = null,
		'aria-label': selfLabel = null
	}: IAriaLabelProps = {}
) {

	const props: IAriaLabelProps = {};
	const roleProp = selfRole || role;

	if (typeof roleProp === 'string') {
		props.role = roleProp;
	}

	if (typeof selfLabelledBy === 'string') {
		props['aria-labelledby'] = selfLabelledBy;
	} else
	if (typeof selfLabel === 'string') {
		props['aria-label'] = selfLabel;
	} else
	if (typeof labelledBy === 'string') {
		props['aria-labelledby'] = labelledBy;
	} else
	if (typeof label === 'string') {
		props['aria-label'] = label;
	}

	return props;
}

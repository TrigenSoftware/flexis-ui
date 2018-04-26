import React from 'react';
import PropTypes from 'prop-types';
import { getHtmlProps } from '../../helpers';

SelectOption.propTypes = {
	children: PropTypes.any.isRequired
};

export function SelectOption({
	children,
	...props
}) {
	return (
		<option
			{...getHtmlProps(props)}
		>
			{children}
		</option>
	);
}

import React from 'react';
import PropTypes from 'prop-types';
import { getHtmlProps } from '../../helpers';
import stylesheet from './Table.st.css';

TableRow.propTypes = {
	children: PropTypes.any.isRequired
};

export function TableRow({
	children,
	...props
}) {
	return (
		<tr
			{...getHtmlProps(props)}
			{...stylesheet('row', {}, props)}
		>
			{children}
		</tr>
	);
}

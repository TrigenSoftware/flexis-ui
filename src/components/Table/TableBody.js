import React from 'react';
import PropTypes from 'prop-types';
import { getHtmlProps } from '../../helpers';
import stylesheet from './Table.st.css';

TableBody.propTypes = {
	children: PropTypes.any.isRequired
};

export function TableBody({
	children,
	...props
}) {
	return (
		<tbody
			{...getHtmlProps(props)}
			{...stylesheet('body', {}, props)}
		>
			{children}
		</tbody>
	);
}

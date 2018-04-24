import React from 'react';
import PropTypes from 'prop-types';
import { getHtmlProps } from '../../helpers';
import stylesheet from './Table.st.css';

TableHead.propTypes = {
	children: PropTypes.any.isRequired
};

export function TableHead({
	children,
	...props
}) {
	return (
		<thead
			{...getHtmlProps(props)}
			{...stylesheet('head', {}, props)}
		>
			{children}
		</thead>
	);
}

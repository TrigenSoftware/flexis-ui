import React from 'react';
import PropTypes from 'prop-types';
import { getHtmlProps } from '../../helpers';
import stylesheet from './Menu.st.css';

MenuItem.propTypes = {
	children: PropTypes.any.isRequired
};

export function MenuItem({
	children,
	...props
}) {
	return (
		<li
			{...getHtmlProps(props)}
			{...stylesheet('item', {}, props)}
		>
			{children}
		</li>
	);
}

import React from 'react';
import PropTypes from 'prop-types';
import { getHtmlProps } from '../../helpers';
import stylesheet from './Menu.st.css';

MenuItem.propTypes = {
	children: PropTypes.node.isRequired
};

export function MenuItem({
	children,
	...props
}) {
	return (
		<li
			role='menuitem'
			{...getHtmlProps(props)}
			{...stylesheet('item', {}, props)}
		>
			{children}
		</li>
	);
}

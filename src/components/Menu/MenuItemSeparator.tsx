import React from 'react';
import PropTypes from 'prop-types';
import { getHtmlProps } from '../../helpers';
import stylesheet from './Menu.st.css';

MenuItemSeparator.propTypes = {
	children: PropTypes.node
};

MenuItemSeparator.defaultProps = {
	children: null
};

export function MenuItemSeparator({
	children,
	...props
}) {
	return (
		<li
			{...getHtmlProps(props)}
			{...stylesheet('itemSeparator', {}, props)}
		>
			{children}
		</li>
	);
}

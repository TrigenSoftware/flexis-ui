import React from 'react';
import PropTypes from 'prop-types';
import { getHtmlProps } from '../../helpers';
import stylesheet from './Menu.st.css';

export * from './MenuItem';
export * from './MenuItemSeparator';
export * from './MenuButton';

Menu.propTypes = {
	children: PropTypes.node.isRequired
};

export default function Menu({
	children,
	...props
}) {
	return (
		<ul
			{...getHtmlProps(props)}
			{...stylesheet('root', {}, props)}
		>
			{children}
		</ul>
	);
}

import React from 'react';
import PropTypes from 'prop-types';
import { getHtmlProps } from '../../helpers';
import stylesheet from './Expand.st.css';

ExpandTitle.propTypes = {
	tabIndex: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string
	]),
	disabled: PropTypes.bool,
	children: PropTypes.node
};

ExpandTitle.defaultProps = {
	tabIndex: 0,
	disabled: false,
	children: null
};

export function ExpandTitle({
	tabIndex,
	disabled,
	children,
	...props
}) {
	return (
		<div
			{...getHtmlProps(props)}
			{...stylesheet('title', {}, props)}
			tabIndex={disabled ? -1 : tabIndex}
		>
			{children}
		</div>
	);
}

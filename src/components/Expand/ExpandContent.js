import React from 'react';
import PropTypes from 'prop-types';
import { getHtmlProps } from '../../helpers';
import stylesheet from './Expand.st.css';

ExpandContent.propTypes = {
	children: PropTypes.any
};

ExpandContent.defaultProps = {
	children: null
};

export function ExpandContent({
	children,
	...props
}) {
	return (
		<div
			{...getHtmlProps(props)}
			{...stylesheet('content', {}, props)}
		>
			{children}
		</div>
	);
}

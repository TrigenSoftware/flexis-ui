import React from 'react';
import PropTypes from 'prop-types';
import { getHtmlProps } from '../../helpers';
import stylesheet from './Expand.st.css';

ExpandTitle.propTypes = {
	children: PropTypes.any
};

ExpandTitle.defaultProps = {
	children: null
};

export function ExpandTitle({
	children,
	...props
}) {
	return (
		<div
			{...getHtmlProps(props)}
			{...stylesheet('title', {}, props)}
		>
			{children}
		</div>
	);
}

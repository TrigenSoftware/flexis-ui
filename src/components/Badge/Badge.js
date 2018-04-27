import React from 'react';
import PropTypes from 'prop-types';
import { getHtmlProps } from '../../helpers';
import stylesheet from './Badge.st.css';

export {
	default as BadgeContainer
} from './BadgeContainer';

Badge.propTypes = {
	children: PropTypes.any
};

Badge.defaultProps = {
	children: null
};

export default function Badge({
	children,
	...props
}) {
	return (
		<label
			{...getHtmlProps(props)}
			{...stylesheet('root', {}, props)}
		>
			{children}
		</label>
	);
}

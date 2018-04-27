import React from 'react';
import PropTypes from 'prop-types';
import { getHtmlProps } from '../../../helpers';
import stylesheet from './BadgeContainer.st.css';

BadgeContainer.propTypes = {
	placement: PropTypes.oneOf([
		'top',
		'right',
		'bottom',
		'left'
	]).isRequired,
	align:     PropTypes.oneOf([
		'start',
		'center',
		'end'
	]),
	children:  PropTypes.any.isRequired
};

BadgeContainer.defaultProps = {
	align: 'center'
};

export default function BadgeContainer({
	placement,
	align,
	children,
	...props
}) {
	return (
		<span
			{...getHtmlProps(props)}
			{...stylesheet('root', {
				[`${placement}Placement`]: placement,
				[`${align}Align`]:         align
			}, props)}
		>
			{children}
		</span>
	);
}

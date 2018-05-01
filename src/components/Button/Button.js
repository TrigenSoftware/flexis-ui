import React, {
	Children,
	cloneElement
} from 'react';
import PropTypes from 'prop-types';
import { getHtmlProps } from '../../helpers';
import stylesheet from './Button.st.css';

Button.propTypes = {
	elementRef: PropTypes.func,
	iconOnly:   PropTypes.bool,
	icon:       PropTypes.element,
	flexIcon:   PropTypes.bool,
	alignIcon:  PropTypes.oneOf([
		'left',
		'right'
	]),
	children:   PropTypes.any
};

Button.defaultProps = {
	elementRef: null,
	iconOnly:   false,
	icon:       null,
	flexIcon:   false,
	alignIcon:  'left',
	children:   null
};

export default function Button({
	elementRef,
	icon,
	iconOnly,
	flexIcon,
	alignIcon,
	children,
	...props
}) {

	const leftAligned = alignIcon == 'left';

	let buttonIcon = null;

	if (icon !== null) {
		buttonIcon = cloneElement(
			icon,
			stylesheet('icon', {
				[`${alignIcon}Align`]: Boolean(alignIcon)
					&& Children.count(children)
					&& !iconOnly
			}, icon.props)
		);
	}

	return (
		<button
			{...getHtmlProps(props)}
			{...stylesheet('root', {
				withIcon: Boolean(buttonIcon),
				flexIcon
			}, props)}
			ref={elementRef}
		>
			{buttonIcon ? (
				<div
					{...stylesheet('iconContainer')}
				>
					{leftAligned && buttonIcon}
					<span>{children}</span>
					{!leftAligned && buttonIcon}
				</div>
			) : children}
		</button>
	);
}

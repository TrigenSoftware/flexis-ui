import React, {
	Children,
	cloneElement
} from 'react';
import PropTypes from 'prop-types';
import { getHtmlProps } from '../../helpers';
import stylesheet from './Link.st.css';

let LinkElement = 'a',
	linkElementCustomProps = [];

Link.propTypes = {
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

Link.defaultProps = {
	elementRef: null,
	iconOnly:   false,
	icon:       null,
	flexIcon:   false,
	alignIcon:  'left',
	children:   null
};

export default function Link({
	elementRef,
	icon,
	iconOnly,
	flexIcon,
	alignIcon,
	children,
	...props
}) {

	const leftAligned = alignIcon == 'left';

	let linkIcon = null;

	if (icon !== null) {
		linkIcon = cloneElement(
			icon,
			stylesheet('icon', {
				[`${alignIcon}Align`]: alignIcon
					&& Children.count(children)
					&& !iconOnly
			}, icon.props)
		);
	}

	return (
		<LinkElement
			{...getHtmlProps(props)}
			{...stylesheet('root', {
				withIcon: Boolean(linkIcon),
				flexIcon
			}, props)}
			{...getLinkElementCustomProps(props)}
			ref={elementRef}
		>
			{linkIcon ? (
				<div
					{...stylesheet('iconContainer')}
				>
					{leftAligned && linkIcon}
					<span>{children}</span>
					{!leftAligned && linkIcon}
				</div>
			) : children}
		</LinkElement>
	);
}

export function setLinkElement(linkElement, customProps = []) {
	LinkElement = linkElement;
	linkElementCustomProps = customProps;
}

export function getLinkElement() {
	return LinkElement;
}

function getLinkElementCustomProps(inputProps) {
	return linkElementCustomProps.reduce((customProps, prop) => {

		if (inputProps.hasOwnProperty(prop)) {
			customProps[prop] = inputProps[prop];
		}

		return customProps;
	}, {});
}

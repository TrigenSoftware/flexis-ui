import React, {
	Children,
	cloneElement
} from 'react';
import PropTypes from 'prop-types';
import { getHtmlProps } from '../../helpers';
import stylesheet from './Link.st.css';

const safeTargetBlankRel = 'noopener noreferrer';

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
	rel:        PropTypes.string,
	target:     PropTypes.string,
	children:   PropTypes.node
};

Link.defaultProps = {
	elementRef: null,
	iconOnly:   false,
	icon:       null,
	flexIcon:   false,
	alignIcon:  'left',
	rel:        null,
	target:     null,
	children:   null
};

export default function Link({
	elementRef,
	icon,
	iconOnly,
	flexIcon,
	alignIcon,
	rel,
	target,
	children,
	...props
}) {

	const leftAligned = alignIcon == 'left';

	let linkIcon = null;

	if (icon !== null) {
		linkIcon = cloneElement(
			icon,
			stylesheet('icon', {
				[`${alignIcon}Align`]: Boolean(alignIcon)
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
			target={target}
			rel={target === '_blank' && rel === null
				? safeTargetBlankRel
				: rel
			}
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

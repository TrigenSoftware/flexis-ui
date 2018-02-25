import React, {
	PureComponent,
	Children
} from 'react';
import PropTypes from 'prop-types';
import {
	stylable,
	getHtmlProps
} from '../helpers';
import * as config from '../config';
import stylesheet from './Link.st.css';

export const colors = [
	...config.colors
];

export const sizes = [
	...config.sizes
];

export const variants = [
	'decorated',
	'disguised'
];

let LinkElement = 'a',
	linkElementCustomProps = [];

@stylable(stylesheet)
export default class Link extends PureComponent {

	static propTypes = {
		focus:     PropTypes.bool,
		hover:     PropTypes.bool,
		active:    PropTypes.bool,
		iconOnly:  PropTypes.bool,
		icon:      PropTypes.element,
		flexIcon:  PropTypes.bool,
		alignIcon: PropTypes.oneOf([
			'left',
			'right'
		]),
		color:     PropTypes.oneOf(colors),
		size:      PropTypes.oneOf(sizes),
		variant:   PropTypes.oneOf(variants),
		children:  PropTypes.any
	};

	static defaultProps = {
		focus:     false,
		hover:     false,
		active:    false,
		iconOnly:  false,
		icon:      null,
		flexIcon:  false,
		alignIcon: 'left',
		color:     null,
		size:      null,
		variant:   null,
		children:  null
	};

	render() {

		const {
			focus,
			hover,
			active,
			icon,
			iconOnly,
			flexIcon,
			alignIcon,
			color,
			size,
			variant,
			children,
			...props
		} = this.props;

		const leftAligned = alignIcon == 'left';

		let linkIcon = null;

		if (icon !== null) {
			linkIcon = {
				...icon,
				props: {
					...icon.props,
					...stylesheet('icon', {
						[`${alignIcon}Align`]: alignIcon
							&& Children.count(children)
							&& !iconOnly
					}, icon.props)
				}
			};
		}

		return (
			<LinkElement
				style-state={{
					[`${color}Color`]: color,
					[`${size}Size`]:   size,
					[variant]:         variant,
					withIcon:          Boolean(linkIcon),
					pseudoFocus:       focus,
					pseudoHover:       hover,
					pseudoActive:      active,
					flexIcon
				}}
				{...getHtmlProps(props)}
				{...getLinkElementCustomProps(props)}
			>
				{linkIcon ? (
					<div className='iconContainer'>
						{leftAligned && linkIcon}
						<span>{children}</span>
						{!leftAligned && linkIcon}
					</div>
				) : children}
			</LinkElement>
		);
	}
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
		customProps[prop] = inputProps[prop];
		return customProps;
	}, {});
}

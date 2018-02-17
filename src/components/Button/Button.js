import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';
import {
	stylable,
	getHtmlProps
} from '../helpers';
import * as config from '../config';
import stylesheet from './Button.st.css';

export const colors = [
	...config.colors
];

export const sizes = [
	...config.sizes
];

export const variants = [
	'round',
	'raised',
	'outline',
	'flat',
	'fab'
];

@stylable(stylesheet)
export default class Button extends PureComponent {

	static propTypes = {
		children:  PropTypes.any,
		focus:     PropTypes.bool,
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
		variant:   PropTypes.oneOf(variants)
	};

	static defaultProps = {
		children:  null,
		focus:     false,
		active:    false,
		iconOnly:  false,
		icon:      null,
		flexIcon:  false,
		alignIcon: 'left',
		color:     null,
		size:      null,
		variant:   null
	};

	render() {

		const {
			children,
			focus,
			active,
			icon,
			iconOnly,
			alignIcon,
			color,
			size,
			variant,
			flexIcon,
			...props
		} = this.props;

		const leftAligned = alignIcon == 'left';

		let buttonIcon = null;

		if (icon !== null) {
			buttonIcon = {
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
			<button
				style-state={{
					[`${color}Color`]: color,
					[`${size}Size`]:   size,
					[variant]:         variant,
					withIcon:          Boolean(buttonIcon),
					pseudoFocus:       focus,
					pseudoActive:      active,
					flexIcon
				}}
				{...getHtmlProps(props)}
			>
				{buttonIcon ? (
					<div className='iconContainer'>
						{leftAligned && buttonIcon}
						<span>{children}</span>
						{!leftAligned && buttonIcon}
					</div>
				) : children}
			</button>
		);
	}
}

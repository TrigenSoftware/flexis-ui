import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';
import {
	stylable,
	getHtmlProps
} from '../../helpers';
import stylesheet from './Button.st.css';

@stylable(stylesheet)
export default class Button extends PureComponent {

	static propTypes = {
		children:  PropTypes.any,
		focus:     PropTypes.bool,
		active:    PropTypes.bool,
		disabled:  PropTypes.bool,
		iconOnly:  PropTypes.bool,
		icon:      PropTypes.element,
		flexIcon:  PropTypes.bool,
		alignIcon: PropTypes.oneOf(['left', 'right']),
		color:     PropTypes.string,
		size:      PropTypes.string,
		variant:   PropTypes.string
	};

	static defaultProps = {
		children:  null,
		focus:     false,
		active:    false,
		disabled:  false,
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
			disabled,
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
					[`${color}Color`]:     color,
					[`${size}Size`]:       size,
					[`${variant}Variant`]: variant,
					withIcon:              Boolean(buttonIcon),
					pseudoFocus:           focus,
					pseudoActive:          active,
					pseudoDisabled:        disabled,
					flexIcon
				}}
				disabled={disabled}
				{...getHtmlProps(props)}
			>
				{buttonIcon ? (
					<div className='iconGrid'>
						{leftAligned && buttonIcon}
						<span className='iconLabel'>{children}</span>
						{!leftAligned && buttonIcon}
					</div>
				) : children}
			</button>
		);
	}
}

import React, {
	PureComponent,
	Children,
	cloneElement
} from 'react';
import PropTypes from 'prop-types';
import {
	Stylable,
	getHtmlProps,
	valueOrUndef
} from '../../helpers';
import stylesheet from './Button.st.css';

@Stylable(stylesheet)
export default class Button extends PureComponent {

	static propTypes = {
		elementRef: PropTypes.func,
		focus:      PropTypes.bool,
		hover:      PropTypes.bool,
		active:     PropTypes.bool,
		iconOnly:   PropTypes.bool,
		icon:       PropTypes.element,
		flexIcon:   PropTypes.bool,
		alignIcon:  PropTypes.oneOf([
			'left',
			'right'
		]),
		children:   PropTypes.any
	};

	static defaultProps = {
		elementRef: null,
		focus:      false,
		hover:      false,
		active:     false,
		iconOnly:   false,
		icon:       null,
		flexIcon:   false,
		alignIcon:  'left',
		children:   null
	};

	render() {

		const {
			elementRef,
			focus,
			hover,
			active,
			icon,
			iconOnly,
			flexIcon,
			alignIcon,
			children,
			...props
		} = this.props;

		const leftAligned = alignIcon == 'left';

		let buttonIcon = null;

		if (icon !== null) {
			buttonIcon = cloneElement(
				icon,
				stylesheet('icon', {
					[`${alignIcon}Align`]: alignIcon
						&& Children.count(children)
						&& !iconOnly
				}, icon.props)
			);
		}

		return (
			<button
				{...getHtmlProps(props)}
				ref={valueOrUndef(elementRef)}
				style-state={{
					withIcon:     Boolean(buttonIcon),
					pseudoFocus:  focus,
					pseudoHover:  hover,
					pseudoActive: active,
					flexIcon
				}}
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

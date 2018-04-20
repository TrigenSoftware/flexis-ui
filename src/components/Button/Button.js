import React, {
	PureComponent,
	Children
} from 'react';
import PropTypes from 'prop-types';
import {
	stylable,
	getHtmlProps
} from '../helpers';
import stylesheet from './Button.st.css';

@stylable(stylesheet)
export default class Button extends PureComponent {

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
			children,
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
					withIcon:     Boolean(buttonIcon),
					pseudoFocus:  focus,
					pseudoHover:  hover,
					pseudoActive: active,
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

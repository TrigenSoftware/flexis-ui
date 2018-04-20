import React, {
	PureComponent,
	Children
} from 'react';
import PropTypes from 'prop-types';
import {
	Stylable,
	getHtmlProps
} from '../helpers';
import stylesheet from './Link.st.css';

let LinkElement = 'a',
	linkElementCustomProps = [];

@Stylable(stylesheet)
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
				{...getHtmlProps(props)}
				style-state={{
					withIcon:     Boolean(linkIcon),
					pseudoFocus:  focus,
					pseudoHover:  hover,
					pseudoActive: active,
					flexIcon
				}}
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

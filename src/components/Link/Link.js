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
import stylesheet from './Link.st.css';

let LinkElement = 'a',
	linkElementCustomProps = [];

@Stylable(stylesheet)
export default class Link extends PureComponent {

	static propTypes = {
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

	static defaultProps = {
		elementRef: null,
		iconOnly:   false,
		icon:       null,
		flexIcon:   false,
		alignIcon:  'left',
		children:   null
	};

	render() {

		const {
			elementRef,
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
				ref={valueOrUndef(elementRef)}
				style-state={{
					withIcon: Boolean(linkIcon),
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

		if (inputProps.hasOwnProperty(prop)) {
			customProps[prop] = inputProps[prop];
		}

		return customProps;
	}, {});
}

import React, {
	ButtonHTMLAttributes,
	Ref,
	ReactElement,
	ReactNode,
	PureComponent,
	Children,
	cloneElement
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes
} from '../../helpers';
import {
	AlignSide,
	AlignSideVariant,
	AlignSideValues
} from '../common/types';
import stylesheet from './Button.st.css';

interface ISelfProps {
	elementRef?: Ref<HTMLButtonElement>;
	icon?: ReactElement<any>;
	flexIcon?: boolean;
	alignIcon?: AlignSide;
	children?: ReactNode;
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	ButtonHTMLAttributes<HTMLButtonElement>
>;

export default class Button extends PureComponent<IProps> {

	static propTypes = {
		elementRef: PropTypes.func,
		icon:       PropTypes.element,
		flexIcon:   PropTypes.bool,
		alignIcon:  PropTypes.oneOf(AlignSideValues),
		children:   PropTypes.node
	};

	static defaultProps = {
		elementRef: null,
		icon:       null,
		flexIcon:   false,
		alignIcon:  AlignSideVariant.Left,
		children:   null
	};

	render() {

		const {
			elementRef,
			icon,
			flexIcon,
			alignIcon,
			children,
			...props
		} = this.props;
		const iconOnly = !Children.count(children);
		const leftAligned = alignIcon === 'left';
		let buttonIcon: ReactElement<any> = null;

		if (icon !== null) {
			buttonIcon = cloneElement(
				icon,
				stylesheet('icon', {
					[`${alignIcon}Align`]: Boolean(alignIcon) && !iconOnly
				}, icon.props)
			);
		}

		return (
			<button
				ref={elementRef}
				{...props}
				{...stylesheet('root', {
					withIcon: Boolean(buttonIcon),
					flexIcon
				}, props)}
			>
				{buttonIcon ? (
					<div
						{...stylesheet('iconContainer')}
					>
						{leftAligned && buttonIcon}
						{!iconOnly && (
							<span>{children}</span>
						)}
						{!leftAligned && buttonIcon}
					</div>
				) : children}
			</button>
		);
	}
}

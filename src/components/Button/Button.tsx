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
import {
	style,
	classes
} from './Button.st.css';

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
		flexIcon:   false,
		alignIcon:  AlignSideVariant.Left
	};

	render() {

		const {
			className,
			elementRef,
			icon,
			flexIcon,
			alignIcon,
			children,
			...props
		} = this.props;
		const iconOnly = !Children.count(children);
		const leftAligned = alignIcon === AlignSideVariant.Left;
		let buttonIcon: ReactElement<any> = null;

		if (typeof icon !== 'undefined') {
			buttonIcon = cloneElement(
				icon,
				{
					className: style(classes.icon, {
						[`${alignIcon}Align`]: Boolean(alignIcon) && !iconOnly
					}, icon.props.className)
				}
			);
		}

		return (
			<button
				ref={elementRef}
				{...props}
				className={style(classes.root, {
					withIcon: Boolean(buttonIcon),
					flexIcon
				}, className)}
			>
				{buttonIcon ? (
					<div
						className={classes.iconContainer}
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

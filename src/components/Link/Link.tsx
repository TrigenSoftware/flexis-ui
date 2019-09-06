import React, {
	AnchorHTMLAttributes,
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
} from './Link.st.css';

interface ISelfProps {
	elementRef?: Ref<any>;
	icon?: ReactElement<any>;
	flexIcon?: boolean;
	alignIcon?: AlignSide;
	rel?: string;
	target?: string;
	linkElement?: any;
	linkElementCustomProps?: { [prop: string]: any };
	children?: ReactNode;
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	AnchorHTMLAttributes<HTMLAnchorElement>
>;

const safeTargetBlankRel = 'noopener noreferrer';

export default class Link extends PureComponent<IProps> {

	static propTypes = {
		elementRef:             PropTypes.func,
		icon:                   PropTypes.element,
		flexIcon:               PropTypes.bool,
		alignIcon:              PropTypes.oneOf(AlignSideValues),
		rel:                    PropTypes.string,
		target:                 PropTypes.string,
		children:               PropTypes.node,
		linkElement:            PropTypes.any,
		linkElementCustomProps: PropTypes.object
	};

	static defaultProps = {
		flexIcon:               false,
		alignIcon:              AlignSideVariant.Left,
		linkElement:            'a',
		linkElementCustomProps: {}
	};

	render() {

		const {
			className,
			elementRef,
			icon,
			flexIcon,
			alignIcon,
			rel,
			target,
			children,
			linkElement: LinkElement,
			linkElementCustomProps,
			...props
		} = this.props;
		const iconOnly = !Children.count(children);
		const leftAligned = alignIcon === AlignSideVariant.Left;
		let linkIcon: ReactElement<any> = null;

		if (typeof icon !== 'undefined') {
			linkIcon = cloneElement(
				icon,
				{
					className: style(classes.icon, {
						[`${alignIcon}Align`]: Boolean(alignIcon) && !iconOnly
					}, icon.props.className)
				}
			);
		}

		return (
			<LinkElement
				ref={elementRef}
				{...props}
				className={style(classes.root, {
					withIcon: Boolean(linkIcon),
					flexIcon
				}, className)}
				{...linkElementCustomProps}
				target={target}
				rel={target === '_blank' && typeof rel === 'undefined'
					? safeTargetBlankRel
					: rel
				}
			>
				{linkIcon ? (
					<div
						className={classes.iconContainer}
					>
						{leftAligned && linkIcon}
						{!iconOnly && (
							<span>{children}</span>
						)}
						{!leftAligned && linkIcon}
					</div>
				) : children}
			</LinkElement>
		);
	}
}

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
import stylesheet from './Link.st.css';

interface ISelfProps {
	elementRef?: Ref<any>;
	icon?: ReactElement<any>;
	flexIcon?: boolean;
	alignIcon?: 'left'|'right';
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
		alignIcon:              PropTypes.oneOf([
			'left',
			'right'
		]),
		rel:                    PropTypes.string,
		target:                 PropTypes.string,
		children:               PropTypes.node,
		linkElement:            PropTypes.any,
		linkElementCustomProps: PropTypes.object
	};

	static defaultProps = {
		elementRef:             null,
		icon:                   null,
		flexIcon:               false,
		alignIcon:              'left',
		rel:                    null,
		target:                 null,
		children:               null,
		linkElement:            'a',
		linkElementCustomProps: {}
	};

	render() {

		const {
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
		const leftAligned = alignIcon === 'left';
		let linkIcon: ReactElement<any> = null;

		if (icon !== null) {
			linkIcon = cloneElement(
				icon,
				stylesheet('icon', {
					[`${alignIcon}Align`]: Boolean(alignIcon) && !iconOnly
				}, icon.props)
			);
		}

		return (
			<LinkElement
				ref={elementRef}
				{...props}
				{...stylesheet('root', {
					withIcon: Boolean(linkIcon),
					flexIcon
				}, props)}
				{...linkElementCustomProps}
				target={target}
				rel={target === '_blank' && rel === null
					? safeTargetBlankRel
					: rel
				}
			>
				{linkIcon ? (
					<div
						{...stylesheet('iconContainer')}
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

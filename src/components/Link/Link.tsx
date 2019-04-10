import React, {
	AllHTMLAttributes,
	Ref,
	ReactElement,
	ReactNode,
	PureComponent,
	Children,
	cloneElement
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes,
	getHtmlProps
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
	AllHTMLAttributes<HTMLAnchorElement>
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
		const leftAligned = alignIcon === 'left';
		let linkIcon: ReactElement<any> = null;

		if (icon !== null) {

			const iconOnly = !Children.count(children);

			linkIcon = cloneElement(
				icon,
				stylesheet('icon', {
					[`${alignIcon}Align`]: Boolean(alignIcon)
						&& Children.count(children)
						&& !iconOnly
				}, icon.props)
			);
		}

		return (
			<LinkElement
				ref={elementRef}
				{...getHtmlProps(props)}
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
						<span>{children}</span>
						{!leftAligned && linkIcon}
					</div>
				) : children}
			</LinkElement>
		);
	}
}

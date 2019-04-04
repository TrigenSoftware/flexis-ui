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
import stylesheet from './Button.st.css';

interface ISelfProps {
	elementRef?: Ref<HTMLButtonElement>;
	icon?: ReactElement<any>;
	flexIcon?: boolean;
	alignIcon?: 'left'|'right';
	children?: ReactNode;
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	AllHTMLAttributes<HTMLButtonElement>
>;

export default class Button extends PureComponent<IProps> {

	static propTypes = {
		elementRef: PropTypes.func,
		icon:       PropTypes.element,
		flexIcon:   PropTypes.bool,
		alignIcon:  PropTypes.oneOf([
			'left',
			'right'
		]),
		children:   PropTypes.node
	};

	static defaultProps = {
		elementRef: null,
		icon:       null,
		flexIcon:   false,
		alignIcon:  'left',
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
		const leftAligned = alignIcon === 'left';
		let buttonIcon: ReactElement<any> = null;

		if (icon !== null) {

			const iconOnly = !Children.count(children);

			buttonIcon = cloneElement(
				icon,
				stylesheet('icon', {
					[`${alignIcon}Align`]: Boolean(alignIcon)
						&& Children.count(children)
						&& !iconOnly
				}, icon.props)
			);
		}

		return (
			<button
				{...getHtmlProps(props)}
				{...stylesheet('root', {
					withIcon: Boolean(buttonIcon),
					flexIcon
				}, props)}
				ref={elementRef}
			>
				{buttonIcon ? (
					<div
						{...stylesheet('iconContainer')}
					>
						{leftAligned && buttonIcon}
						<span>{children}</span>
						{!leftAligned && buttonIcon}
					</div>
				) : children}
			</button>
		);
	}
}

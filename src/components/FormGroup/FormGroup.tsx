import React, {
	HTMLAttributes,
	ReactElement,
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
} from './FormGroup.st.css';

interface ISelfProps {
	id?: string;
	flex?: boolean;
	label?: string|ReactElement<any>;
	description?: string|ReactElement<any>;
	icon?: ReactElement<any>;
	alignIcon?: AlignSide;
	children: ReactElement<any>;
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	HTMLAttributes<HTMLDivElement>
>;

export default class FormGroup extends PureComponent<IProps> {

	static propTypes = {
		id:          PropTypes.string,
		flex:        PropTypes.bool,
		label:       PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.element
		]),
		description: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.element
		]),
		icon:        PropTypes.element,
		alignIcon:   PropTypes.oneOf(AlignSideValues),
		children:    PropTypes.node.isRequired
	};

	static defaultProps = {
		flex:      true,
		alignIcon: AlignSideVariant.Left
	};

	render() {

		const {
			className,
			id: idProp,
			flex,
			label,
			description,
			icon,
			alignIcon,
			children,
			...props
		} = this.props;
		const child = Children.only(children);
		const {
			props: childProps
		} = child;
		const id = idProp || childProps.id;
		const withIcon = typeof icon !== 'undefined';
		let inputIcon: ReactElement<any> = null;

		if (withIcon) {
			inputIcon = cloneElement(
				icon,
				{
					className: style(classes.icon, {
						[`${alignIcon}Align`]: Boolean(alignIcon)
					}, icon.props.className)
				}
			);
		}

		return (
			<div
				{...props}
				className={style(classes.root, {
					withIcon
				}, className)}
			>
				{cloneElement(
					child,
					{
						id,
						className: style(classes.input, {
							[`${alignIcon}Icon`]: withIcon,
							flex
						}, childProps.className)
					}
				)}
				{inputIcon}
				{label && (
					<label
						className={classes.label}
						htmlFor={id}
					>
						{label}
					</label>
				)}
				{description && (
					<label
						className={classes.description}
						htmlFor={id}
					>
						{description}
					</label>
				)}
			</div>
		);
	}
}

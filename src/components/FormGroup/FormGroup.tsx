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
import stylesheet from './FormGroup.st.css';

interface ISelfProps {
	id?: string;
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
		label:       PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.element
		]),
		description: PropTypes.string,
		icon:       PropTypes.element,
		alignIcon:  PropTypes.oneOf(AlignSideValues),
		children:    PropTypes.node.isRequired
	};

	static defaultProps = {
		alignIcon: AlignSideVariant.Left
	};

	render() {

		const {
			id,
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
		let inputIcon: ReactElement<any> = null;

		if (typeof icon !== 'undefined') {
			inputIcon = cloneElement(
				icon,
				stylesheet('icon', {
					[`${alignIcon}Align`]: Boolean(alignIcon)
				}, icon.props)
			);
		}

		return (
			<div
				{...props}
				{...stylesheet('root', {}, props)}
			>
				{cloneElement(
					child,
					{
						id: id || childProps.id,
						...stylesheet('input', {}, childProps)
					}
				)}
				{inputIcon}
				{label && (
					<label
						{...stylesheet('label')}
						htmlFor={id}
					>
						{label}
					</label>
				)}
				{description && (
					<label
						{...stylesheet('description')}
						htmlFor={id}
					>
						{description}
					</label>
				)}
			</div>
		);
	}
}

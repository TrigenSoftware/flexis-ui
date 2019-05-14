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
import stylesheet from './FormGroup.st.css';

interface ISelfProps {
	id?: string;
	label?: string|ReactElement<any>;
	description?: string|ReactElement<any>;
	required?: boolean;
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
		required:    PropTypes.bool,
		children:    PropTypes.node.isRequired
	};

	static defaultProps = {
		id:          null,
		label:       null,
		description: null,
		required:    false
	};

	render() {

		const {
			id,
			label,
			description,
			required,
			children,
			...props
		} = this.props;
		const child = Children.only(children);

		return (
			<div
				{...props}
				{...stylesheet('root', {
					required
				}, props)}
			>
				{typeof label !== 'string' ? label : (
					<label
						{...stylesheet('label')}
						htmlFor={id}
					>
						{label}
					</label>
				)}
				{cloneElement(
					child,
					{
						id: id || child.props.id,
						required
					}
				)}
				{typeof description !== 'string' ? description : (
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

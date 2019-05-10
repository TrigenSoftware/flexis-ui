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
	children: ReactElement<any>;
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	HTMLAttributes<HTMLDivElement>
>;

export default class FormGroup extends PureComponent<IProps> {

	static propTypes = {
		id:       PropTypes.string,
		label:    PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.element
		]),
		children: PropTypes.node.isRequired
	};

	static defaultProps = {
		id:    null,
		label: null
	};

	render() {

		const {
			id,
			label,
			children,
			...props
		} = this.props;
		const child = Children.only(children);

		return (
			<div
				{...props}
				{...stylesheet('root', {}, props)}
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
						id: id || child.props.id
					}
				)}
			</div>
		);
	}
}

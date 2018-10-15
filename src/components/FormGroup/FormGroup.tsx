import React, {
	AllHTMLAttributes,
	ReactElement,
	PureComponent,
	cloneElement
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes,
	getHtmlProps
} from '../../helpers';
import stylesheet from './FormGroup.st.css';

interface ISelfProps {
	id?: string;
	label?: string|ReactElement<any>;
	children: ReactElement<any>;
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	AllHTMLAttributes<HTMLDivElement>
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

		return (
			<div
				{...getHtmlProps(props)}
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
					children,
					{ id: id || children.props.id }
				)}
			</div>
		);
	}
}

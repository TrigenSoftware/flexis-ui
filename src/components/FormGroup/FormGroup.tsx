import React, {
	AllHTMLAttributes,
	ReactElement,
	ReactNode,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import { getHtmlProps } from '../../helpers';
import stylesheet from './FormGroup.st.css';

interface ISelfProps {
	label?: string|ReactElement<any>;
	children: ReactNode;
}

export type IProps = ISelfProps & AllHTMLAttributes<HTMLDivElement>;

export default class FormGroup extends PureComponent<IProps> {

	static propTypes = {
		label:    PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.element
		]),
		children: PropTypes.node.isRequired
	};

	static defaultProps = {
		label: null
	};

	render() {

		const {
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
					>
						{label}
					</label>
				)}
				{children}
			</div>
		);
	}
}

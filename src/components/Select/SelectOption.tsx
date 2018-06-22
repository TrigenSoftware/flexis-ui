import React, {
	AllHTMLAttributes,
	ReactNode,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import { getHtmlProps } from '../../helpers';

interface ISelfProps {
	value?: any;
	children: ReactNode;
}

export type ISelectOptionProps = ISelfProps & AllHTMLAttributes<HTMLOptionElement>;

export class SelectOption extends PureComponent<ISelectOptionProps> {

	static propTypes = {
		value:    PropTypes.any,
		children: PropTypes.node.isRequired
	};

	render() {

		const {
			value,
			children,
			...props
		} = this.props;

		return (
			<option
				{...getHtmlProps(props)}
				value={String(value)}
			>
				{children}
			</option>
		);
	}
}
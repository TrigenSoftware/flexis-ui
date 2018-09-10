import React, {
	AllHTMLAttributes,
	ReactNode,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes,
	getHtmlProps
} from '../../helpers';

interface ISelfProps {
	value?: any;
	children: ReactNode;
}

export type ISelectOptionProps = CombinePropsAndAttributes<
	ISelfProps,
	AllHTMLAttributes<HTMLOptionElement>
>;

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
				value={value}
			>
				{children}
			</option>
		);
	}
}

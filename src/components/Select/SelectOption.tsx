import React, {
	OptionHTMLAttributes,
	ReactNode,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes
} from '../../helpers';

interface ISelfProps {
	value?: any;
	children: ReactNode;
}

export type ISelectOptionProps = CombinePropsAndAttributes<
	ISelfProps,
	OptionHTMLAttributes<HTMLOptionElement>
>;

export class SelectOption extends PureComponent<ISelectOptionProps> {

	static propTypes = {
		value:    PropTypes.any,
		children: PropTypes.node.isRequired
	};

	render() {

		const {
			children,
			...props
		} = this.props;

		return (
			<option
				{...props}
			>
				{children}
			</option>
		);
	}
}

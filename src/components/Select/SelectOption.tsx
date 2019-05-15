import React, {
	OptionHTMLAttributes,
	ReactNode,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes
} from '../../helpers';
import {
	Primitive,
	PrimitivePropType
} from '../common/types';

interface ISelfProps {
	value?: Primitive;
	children: ReactNode;
}

export type ISelectOptionProps = CombinePropsAndAttributes<
	ISelfProps,
	OptionHTMLAttributes<HTMLOptionElement>
>;

export class SelectOption extends PureComponent<ISelectOptionProps> {

	static propTypes = {
		value:    PrimitivePropType,
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
				{...props}
				value={value as string}
			>
				{children}
			</option>
		);
	}
}

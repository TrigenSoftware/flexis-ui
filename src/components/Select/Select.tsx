import React, {
	SelectHTMLAttributes,
	Ref,
	ReactNode,
	ReactElement,
	ChangeEvent,
	PureComponent,
	Children
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes,
	Bind,
	omit
} from '../../helpers';
import {
	Primitive,
	PrimitivePropType
} from '../common/types';
import stylesheet from './Select.st.css';

export * from './SelectOption';

interface ISelfProps {
	elementRef?: Ref<HTMLSelectElement>;
	defaultValue?: Primitive;
	value?: Primitive;
	children: ReactNode;
	onChange?(value: Primitive, event: ChangeEvent);
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	SelectHTMLAttributes<HTMLSelectElement>
>;

export default class Select extends PureComponent<IProps> {

	static propTypes = {
		elementRef:   PropTypes.func,
		defaultValue: PrimitivePropType,
		value:        PrimitivePropType,
		onChange:     PropTypes.func,
		children:     PropTypes.node.isRequired
	};

	private originalValues: Primitive[] = [];

	render() {

		const {
			elementRef,
			defaultValue,
			value,
			children,
			...props
		} = this.props;

		this.originalValues = Children.toArray(children).map(({
			props: {
				value,
				children
			}
		}: ReactElement<any>) => (
			typeof value === 'undefined'
				? children
				: value
		));

		return (
			<select
				ref={elementRef}
				{...omit(props, ['multiple'])}
				{...stylesheet('root', {}, props)}
				onChange={this.onChange}
				defaultValue={defaultValue as string}
				value={value as string}
			>
				{children}
			</select>
		);
	}

	@Bind()
	onChange(event: ChangeEvent<HTMLSelectElement>) {

		const {
			onChange
		} = this.props;

		if (typeof onChange === 'function') {

			const {
				selectedIndex
			} = event.currentTarget.options;
			const nextValue = this.originalValues[selectedIndex];

			onChange(nextValue, event);
		}
	}
}

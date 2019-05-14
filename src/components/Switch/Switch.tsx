import React, {
	InputHTMLAttributes,
	Ref,
	ChangeEvent,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes,
	Bind
} from '../../helpers';
import {
	Primitive,
	InputValue
} from '../common/types';
import stylesheet from './Switch.st.css';

interface ISelfProps {
	elementRef?: Ref<HTMLInputElement>;
	type: 'checkbox'|'radio';
	value?: InputValue;
	onChange?(value: Primitive, event: ChangeEvent);
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	InputHTMLAttributes<HTMLInputElement>
>;

export default class Switch extends PureComponent<IProps> {

	static propTypes = {
		elementRef: PropTypes.func,
		type:       PropTypes.oneOf([
			'checkbox',
			'radio'
		]).isRequired,
		onChange:   PropTypes.func,
		value:      PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		])
	};

	static defaultProps = {
		elementRef: null,
		onChange:   null
	};

	render() {

		const {
			elementRef,
			...props
		} = this.props;

		return (
			<input
				ref={elementRef}
				{...props}
				{...stylesheet('root', {}, props)}
				onChange={this.onChange}
			/>
		);
	}

	@Bind()
	private onChange(event: ChangeEvent<HTMLInputElement>) {

		const {
			onChange,
			value
		} = this.props;

		if (typeof onChange === 'function') {

			const nextValue = typeof value !== 'undefined'
				? value
				: event.currentTarget.checked;

			onChange(nextValue, event);
		}
	}
}

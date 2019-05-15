import React, {
	InputHTMLAttributes,
	Ref,
	ChangeEvent,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-input-mask';
import {
	CombinePropsAndAttributes,
	Bind
} from '../../helpers';
import {
	InputValue,
	InputValuePropType
} from '../common/types';
import stylesheet from './Input.st.css';

interface ISelfProps {
	elementRef?: Ref<HTMLInputElement>;
	type?: string;
	value?: InputValue;
	defaultValue?: InputValue;
	mask?: string;
	maskChar?: string;
	formatChars?: any;
	alwaysShowMask?: boolean;
	onChange?(value: InputValue, event: ChangeEvent);
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	InputHTMLAttributes<HTMLInputElement>
>;

export default class Input extends PureComponent<IProps> {

	static propTypes = {
		elementRef:     PropTypes.func,
		type:           PropTypes.string,
		onChange:       PropTypes.func,
		value:          InputValuePropType,
		defaultValue:   InputValuePropType,
		mask:           PropTypes.string,
		maskChar:       PropTypes.string,
		formatChars:    PropTypes.object,
		alwaysShowMask: PropTypes.bool
	};

	static defaultProps = {
		elementRef:     null,
		type:           'text',
		onChange:       null,
		mask:           null,
		maskChar:       null,
		formatChars:    null,
		alwaysShowMask: true
	};

	render() {

		const {
			elementRef,
			mask,
			maskChar,
			formatChars,
			alwaysShowMask,
			...props
		} = this.props;
		let Input: any = 'input';
		let maskedInputProps = {};

		if (typeof mask === 'string') {
			Input = MaskedInput;
			maskedInputProps = {
				mask,
				maskChar,
				formatChars,
				alwaysShowMask
			};
		}

		return (
			<Input
				ref={elementRef && mapRef(elementRef)}
				{...props}
				{...stylesheet('root', {}, props)}
				onChange={this.onChange}
				{...maskedInputProps}
			/>
		);
	}

	@Bind()
	private onChange(event: ChangeEvent<HTMLInputElement>) {

		const {
			onChange,
			type
		} = this.props;

		if (typeof onChange === 'function') {

			const {
				value
			} = event.currentTarget;

			onChange(
				isNumberType(type)
					? Number(value)
					: value,
				event
			);
		}
	}
}

function mapRef(elementRef) {
	return ref => elementRef(
		ref instanceof MaskedInput
			? ref.input
			: ref
	);
}

function isNumberType(type: string) {

	switch (type) {

		case 'number':
		case 'range':
			return true;

		default:
			return false;
	}
}

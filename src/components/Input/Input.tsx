import React, {
	AllHTMLAttributes,
	Ref,
	CSSProperties,
	ReactElement,
	ChangeEvent,
	PureComponent,
	cloneElement
} from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-input-mask';
import {
	CombinePropsAndAttributes,
	Listener,
	getHtmlProps
} from '../../helpers';
import stylesheet from './Input.st.css';

interface ISelfProps {
	elementRef?: Ref<HTMLInputElement>;
	style?: CSSProperties;
	type?: string;
	name?: string;
	defaultValue?: string|number;
	value?: string|number;
	icon?: ReactElement<any>;
	alignIcon?: 'left'|'right';
	mask?: string;
	maskChar?: string;
	formatChars?: any;
	alwaysShowMask?: boolean;
	onChange?(value: string, event: ChangeEvent);
	onChange?(value: string, name: string, event: ChangeEvent);
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	AllHTMLAttributes<HTMLInputElement>
>;

export default class Input extends PureComponent<IProps> {

	static propTypes = {
		elementRef:     PropTypes.func,
		style:          PropTypes.object,
		type:           PropTypes.string,
		name:           PropTypes.string,
		onChange:       PropTypes.func,
		defaultValue:   PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]),
		value:          PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]),
		icon:           PropTypes.element,
		alignIcon:      PropTypes.oneOf([
			'left',
			'right'
		]),
		mask:           PropTypes.string,
		maskChar:       PropTypes.string,
		formatChars:    PropTypes.object,
		alwaysShowMask: PropTypes.bool
	};

	static defaultProps = {
		elementRef:     null,
		style:          null,
		type:           'text',
		name:           null,
		onChange:       null,
		defaultValue:   undefined,
		value:          undefined,
		icon:           null,
		alignIcon:      'left',
		mask:           null,
		maskChar:       null,
		formatChars:    null,
		alwaysShowMask: true
	};

	render() {

		const {
			elementRef,
			style,
			type,
			value,
			defaultValue,
			icon,
			alignIcon,
			mask,
			maskChar,
			formatChars,
			alwaysShowMask,
			...props
		} = this.props;
		let Input: any = 'input';
		let maskedInputProps = {};
		let inputIcon: ReactElement<any> = null;

		if (typeof mask === 'string') {
			Input = MaskedInput;
			maskedInputProps = {
				mask,
				maskChar,
				formatChars,
				alwaysShowMask
			};
		}

		if (icon !== null) {
			inputIcon = cloneElement(
				icon,
				stylesheet('icon', {
					[`${alignIcon}Align`]: Boolean(alignIcon)
				}, icon.props)
			);
		}

		return (
			<label
				{...stylesheet('root', {
					withIcon: Boolean(inputIcon)
				}, props)}
				style={style}
			>
				<Input
					ref={elementRef && mapRef(elementRef)}
					{...getHtmlProps(props)}
					{...stylesheet('input')}
					type={type}
					onChange={this.onChange}
					value={value}
					defaultValue={defaultValue}
					{...maskedInputProps}
				/>
				<div
					{...stylesheet('border')}
				/>
				{inputIcon}
			</label>
		);
	}

	@Listener()
	private onChange(event: ChangeEvent<HTMLInputElement>) {

		const {
			name,
			onChange
		} = this.props;

		if (typeof onChange === 'function') {

			if (name) {
				onChange(
					event.currentTarget.value,
					name,
					event
				);
			} else {
				onChange(
					event.currentTarget.value,
					event
				);
			}
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

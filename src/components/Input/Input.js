import React, {
	PureComponent,
	cloneElement
} from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-input-mask';
import {
	Listener,
	getHtmlProps,
	valueOrUndef
} from '../../helpers';
import stylesheet from './Input.st.css';

export default class Input extends PureComponent {

	static propTypes = {
		elementRef:     PropTypes.func,
		style:          PropTypes.object,
		type:           PropTypes.string,
		name:           PropTypes.string,
		onChange:       PropTypes.func,
		value:          PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]),
		defaultValue:   PropTypes.oneOfType([
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
		value:          null,
		defaultValue:   null,
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

		const leftAligned = alignIcon == 'left';

		let Input = 'input',
			maskedInputProps = {},
			inputIcon = null;

		if (typeof mask == 'string') {
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
				{leftAligned && inputIcon}
				<Input
					{...getHtmlProps(props)}
					{...stylesheet('input')}
					ref={elementRef && mapRef(elementRef)}
					type={type}
					onChange={this.onChange()}
					value={valueOrUndef(value)}
					defaultValue={valueOrUndef(defaultValue)}
					{...maskedInputProps}
				/>
				<div
					{...stylesheet('border')}
				/>
				{!leftAligned && inputIcon}
			</label>
		);
	}

	@Listener()
	onChange(event) {

		const {
			name,
			onChange
		} = this.props;

		if (typeof onChange == 'function') {

			if (name) {
				onChange(
					event.target.value,
					name,
					event
				);
			} else {
				onChange(
					event.target.value,
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

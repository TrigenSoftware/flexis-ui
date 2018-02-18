import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-input-mask';
import {
	stylable,
	getHtmlProps,
	valueOrNull
} from '../helpers';
import * as config from '../config';
import stylesheet from './Input.st.css';

export const colors = [
	...config.colors
];

export const sizes = [
	...config.sizes
];

@stylable(stylesheet)
export default class Input extends PureComponent {

	static propTypes = {
		style:          PropTypes.object,
		type:           PropTypes.string,
		onChange:       PropTypes.func,
		value:          PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]),
		defaultValue:   PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]),
		focus:          PropTypes.bool,
		hover:          PropTypes.bool,
		active:         PropTypes.bool,
		icon:           PropTypes.element,
		alignIcon:      PropTypes.oneOf([
			'left',
			'right'
		]),
		mask:           PropTypes.string,
		maskChar:       PropTypes.string,
		formatChars:    PropTypes.object,
		alwaysShowMask: PropTypes.bool,
		color:          PropTypes.oneOf(colors),
		size:           PropTypes.oneOf(sizes)
	};

	static defaultProps = {
		style:          null,
		type:           'text',
		onChange:       null,
		value:          null,
		defaultValue:   null,
		focus:          false,
		hover:          false,
		active:         false,
		icon:           null,
		alignIcon:      'left',
		mask:           null,
		maskChar:       null,
		formatChars:    null,
		alwaysShowMask: true,
		color:          null,
		size:           null
	};

	render() {

		const {
			style,
			type,
			onChange,
			value,
			defaultValue,
			focus,
			hover,
			active,
			icon,
			alignIcon,
			mask,
			maskChar,
			formatChars,
			alwaysShowMask,
			color,
			size,
			...props
		} = this.props;

		const withOnChange = typeof onChange == 'function',
			leftAligned = alignIcon == 'left';

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
			inputIcon = {
				...icon,
				props: {
					...icon.props,
					...stylesheet('icon', {
						[`${alignIcon}Align`]: alignIcon
					}, icon.props)
				}
			};
		}

		return (
			<span
				style-state={{
					[`${color}Color`]: color,
					[`${size}Size`]:   size,
					withIcon:          Boolean(inputIcon),
					pseudoFocus:       focus,
					pseudoHover:       hover,
					pseudoActive:      active
				}}
				style={style}
			>
				{leftAligned && inputIcon}
				<Input
					className='input'
					type={type}
					onChange={(event) => {

						if (withOnChange) {
							onChange(event.target.value, event);
						}
					}}
					value={valueOrNull(value)}
					defaultValue={valueOrNull(defaultValue)}
					{...maskedInputProps}
					{...getHtmlProps(props)}
				/>
				<div className='border'/>
				{!leftAligned && inputIcon}
			</span>
		);
	}
}

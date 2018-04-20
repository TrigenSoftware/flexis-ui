import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-input-mask';
import {
	Stylable,
	getHtmlProps,
	valueOrNull
} from '../helpers';
import stylesheet from './Input.st.css';

@Stylable(stylesheet)
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
		alwaysShowMask: PropTypes.bool
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
		alwaysShowMask: true
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
			<label
				style={style}
				style-state={{
					withIcon:     Boolean(inputIcon),
					pseudoFocus:  focus,
					pseudoHover:  hover,
					pseudoActive: active
				}}
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
			</label>
		);
	}
}

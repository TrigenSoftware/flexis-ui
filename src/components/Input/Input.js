import React, {
	PureComponent,
	cloneElement
} from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-input-mask';
import {
	Stylable,
	Listener,
	getHtmlProps,
	valueOrUndef
} from '../helpers';
import stylesheet from './Input.st.css';

@Stylable(stylesheet)
export default class Input extends PureComponent {

	static propTypes = {
		elementRef:     PropTypes.func,
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
		elementRef:     null,
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
			elementRef,
			style,
			type,
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
					[`${alignIcon}Align`]: alignIcon
				}, icon.props)
			);
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
					{...getHtmlProps(props)}
					ref={valueOrUndef(elementRef && mapRef(elementRef))}
					className='input'
					type={type}
					onChange={this.onChange()}
					value={valueOrUndef(value)}
					defaultValue={valueOrUndef(defaultValue)}
					{...maskedInputProps}
				/>
				<div className='border'/>
				{!leftAligned && inputIcon}
			</label>
		);
	}

	@Listener()
	onChange(event) {

		const {
			onChange
		} = this.props;

		if (typeof onChange == 'function') {
			onChange(event.target.value, event);
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

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	stylable,
	getHtmlProps,
	valueOrNull
} from '../helpers';
import * as config from '../config';
import stylesheet from './Switch.st.css';

export const colors = [
	...config.colors
];

export const sizes = [
	...config.sizes
];

@stylable(stylesheet)
export default class Switch extends PureComponent {

	static propTypes = {
		style:          PropTypes.object,
		type:           PropTypes.oneOf([
			'checkbox',
			'radio'
		]).isRequired,
		onChange:       PropTypes.func,
		value:          PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]),
		checked:        PropTypes.bool,
		defaultChecked: PropTypes.bool,
		focus:          PropTypes.bool,
		hover:          PropTypes.bool,
		active:         PropTypes.bool,
		color:          PropTypes.oneOf(colors),
		size:           PropTypes.oneOf(sizes)
	};

	static defaultProps = {
		style:          null,
		onChange:       null,
		value:          null,
		checked:        null,
		defaultChecked: null,
		focus:          false,
		hover:          false,
		active:         false,
		color:          null,
		size:           null
	};

	render() {

		const {
			style,
			type,
			onChange,
			value,
			checked,
			defaultChecked,
			focus,
			hover,
			active,
			color,
			size,
			...props
		} = this.props;

		const useValue = value != null,
			withOnChange = typeof onChange == 'function';

		return (
			<span
				style-state={{
					[`${color}Color`]: color,
					[`${size}Size`]:   size,
					pseudoFocus:       focus,
					pseudoHover:       hover,
					pseudoActive:      active
				}}
				style={style}
			>
				<input
					className='input'
					type={type}
					onChange={(event) => {

						if (withOnChange) {
							onChange(
								useValue
									? event.target.value
									: event.target.checked,
								event
							);
						}
					}}
					value={valueOrNull(value)}
					checked={valueOrNull(checked)}
					defaultChecked={valueOrNull(defaultChecked)}
					{...getHtmlProps(props)}
				/>
				<div className='face'/>
			</span>
		);
	}
}

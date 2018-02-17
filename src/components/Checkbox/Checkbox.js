import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	stylable,
	getHtmlProps,
	valueOrNull
} from '../helpers';
import * as config from '../config';
import stylesheet from './Checkbox.st.css';

export const colors = [
	...config.colors
];

export const sizes = [
	...config.sizes
];

@stylable(stylesheet)
export default class Checkbox extends PureComponent {

	static propTypes = {
		style:          PropTypes.object,
		onChange:       PropTypes.func,
		value:          PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]),
		checked:        PropTypes.bool,
		defaultChecked: PropTypes.bool,
		focus:          PropTypes.bool,
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
		color:          null,
		size:           null
	};

	render() {

		const {
			style,
			onChange,
			value,
			checked,
			defaultChecked,
			focus,
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
					pseudoFocus:       focus
				}}
				style={style}
			>
				<input
					className='checkbox'
					type='checkbox'
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

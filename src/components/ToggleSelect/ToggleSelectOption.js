import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	Listener,
	valueOrUndef
} from '../../helpers';
import Button from '../Button';
import stylesheet from './ToggleSelect.st.css';

export class ToggleSelectOption extends PureComponent {

	static propTypes = {
		type:     PropTypes.oneOf([
			'radio', 'checkbox'
		]),
		name:     PropTypes.string,
		onChange: PropTypes.func,
		value:    PropTypes.any,
		checked:  PropTypes.bool,
		disabled: PropTypes.bool,
		children: PropTypes.any.isRequired
	};

	static defaultProps = {
		type:     null,
		name:     null,
		onChange: null,
		value:    null,
		checked:  null,
		disabled: false
	};

	render() {

		const {
			type,
			name,
			value,
			checked,
			disabled,
			children,
			...props
		} = this.props;

		Reflect.deleteProperty(props, 'onChange');

		return (
			<li
				{...stylesheet('option')}
			>
				<input
					{...stylesheet('input')}
					type={type}
					name={valueOrUndef(name)}
					checked={valueOrUndef(checked)}
					onChange={this.onChange()}
					value={value}
					disabled={disabled}
				/>
				<Button
					{...props}
					type='button'
					disabled={disabled}
					onClick={this.onButtonClick}
				>
					{children}
				</Button>
			</li>
		);
	}

	@Listener()
	onChange(event) {

		const {
			onChange,
			value
		} = this.props;

		if (typeof onChange == 'function') {
			onChange(
				value,
				event
			);
		}
	}

	onButtonClick(event) {
		event.target.previousElementSibling.click();
	}
}
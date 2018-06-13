import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Listener } from '../../helpers';
import Button from '../Button';
import stylesheet from './CustomSelect.st.css';

export class CustomSelectOption extends PureComponent {

	static propTypes = {
		id:       PropTypes.string,
		type:     PropTypes.oneOf([
			'radio', 'checkbox'
		]),
		name:     PropTypes.string,
		onChange: PropTypes.func,
		value:    PropTypes.any,
		checked:  PropTypes.bool,
		disabled: PropTypes.bool,
		children: PropTypes.node.isRequired
	};

	static defaultProps = {
		id:       null,
		type:     null,
		name:     null,
		onChange: null,
		value:    null,
		checked:  null,
		disabled: false
	};

	render() {

		const {
			id,
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
				id={id}
				role='option'
				{...stylesheet('option')}
			>
				<label
					{...stylesheet('label')}
				>
					<input
						{...stylesheet('input')}
						type={type}
						name={name}
						checked={checked}
						onChange={this.onChange()}
						value={value}
						disabled={disabled}
					/>
					<Button
						{...props}
						{...stylesheet('button', {}, props)}
						type='button'
						disabled={disabled}
						onClick={this.onButtonClick}
					>
						{children}
					</Button>
				</label>
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

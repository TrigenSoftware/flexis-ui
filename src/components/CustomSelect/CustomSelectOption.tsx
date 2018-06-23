import React, {
	ReactNode,
	ChangeEvent,
	MouseEvent,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes,
	Listener
} from '../../helpers';
import Button, { IProps as IButtonProps } from '../Button';
import stylesheet from './CustomSelect.st.css';

interface ISelfProps {
	id?: string;
	type?: 'radio'|'checkbox';
	name?: string;
	value?: any;
	checked?: boolean;
	disabled?: boolean;
	children: ReactNode;
	onChange?(value, event: ChangeEvent);
}

export type ICustomSelectOptionProps = CombinePropsAndAttributes<
	ISelfProps,
	IButtonProps
>;

export class CustomSelectOption extends PureComponent<ICustomSelectOptionProps> {

	static propTypes = {
		id:       PropTypes.string,
		type:     PropTypes.oneOf([
			'radio',
			'checkbox'
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
						onChange={this.onChange}
						value={value}
						disabled={disabled}
					/>
					<Button
						{...props as IButtonProps}
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
	private onChange(event: ChangeEvent) {

		const {
			onChange,
			value
		} = this.props;

		if (typeof onChange === 'function') {
			onChange(
				value,
				event
			);
		}
	}

	private onButtonClick(event: MouseEvent<HTMLButtonElement>) {

		const input = event.currentTarget.previousElementSibling as HTMLInputElement;

		input.click();
	}
}

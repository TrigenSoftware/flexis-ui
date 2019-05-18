import React, {
	LiHTMLAttributes,
	ReactNode,
	ChangeEvent,
	MouseEvent,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes,
	Bind,
	omit
} from '../../helpers';
import {
	SelectValue,
	SelectValuePropType
} from '../common/types';
import stylesheet from './CustomFlatSelect.st.css';

interface ISelfProps {
	optionId?: string;
	id?: string;
	type?: 'radio'|'checkbox';
	name?: string;
	value?: SelectValue;
	checked?: boolean;
	disabled?: boolean;
	children: ReactNode;
	onChange?(value: SelectValue, event: ChangeEvent);
}

export type ICustomFlatSelectOptionProps = CombinePropsAndAttributes<
	ISelfProps,
	LiHTMLAttributes<HTMLLIElement>
>;

export class CustomFlatSelectOption extends PureComponent<ICustomFlatSelectOptionProps> {

	static propTypes = {
		id:       PropTypes.string,
		type:     PropTypes.oneOf([
			'radio',
			'checkbox'
		]),
		name:     PropTypes.string,
		onChange: PropTypes.func,
		value:    SelectValuePropType,
		checked:  PropTypes.bool,
		disabled: PropTypes.bool,
		children: PropTypes.node.isRequired
	};

	static defaultProps = {
		checked:  false,
		disabled: false
	};

	render() {

		const {
			optionId,
			id,
			type,
			name,
			value,
			checked,
			disabled,
			children,
			...props
		} = this.props;

		return (
			<li
				id={optionId}
				role='option'
				aria-selected={checked}
				aria-disabled={disabled}
				{...omit(props, ['onChange'])}
				{...stylesheet('option')}
			>
				<label
					{...stylesheet('label')}
				>
					<input
						{...stylesheet('input')}
						id={id}
						type={type}
						name={name}
						checked={checked}
						onChange={this.onChange}
						value={value as string}
						disabled={disabled}
					/>
					<span
						{...stylesheet('face')}
						onClick={this.onFaceClick}
					>
						{children}
					</span>
				</label>
			</li>
		);
	}

	@Bind()
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

	private onFaceClick(event: MouseEvent) {

		const {
			target,
			currentTarget
		} = event;

		if (target === currentTarget) {
			return;
		}

		const input = currentTarget.previousElementSibling as HTMLInputElement;

		input.click();
	}
}

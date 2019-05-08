import React, {
	AllHTMLAttributes,
	ReactNode,
	ChangeEvent,
	MouseEvent,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes,
	Bind,
	getHtmlProps
} from '../../helpers';
import stylesheet from './CustomFlatSelect.st.css';

interface ISelfProps {
	id?: string;
	type?: 'radio'|'checkbox';
	name?: string;
	value?: any;
	checked?: boolean;
	disabled?: boolean;
	children: ReactNode;
	onChange?(value: any, event: ChangeEvent);
}

export type ICustomFlatSelectOptionProps = CombinePropsAndAttributes<
	ISelfProps,
	AllHTMLAttributes<HTMLLIElement>
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
		value:    undefined,
		checked:  false,
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

		return (
			<li
				id={id}
				role='option'
				{...getHtmlProps(props, ['onChange'])}
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

		const input = event.currentTarget.previousElementSibling as HTMLInputElement;

		input.click();
	}
}

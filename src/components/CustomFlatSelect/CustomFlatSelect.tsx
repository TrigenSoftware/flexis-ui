import React, {
	HTMLAttributes,
	ReactElement,
	ReactNode,
	ChangeEvent,
	PureComponent,
	Children,
	cloneElement
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
import isCurrentValue from '../common/isCurrentValue';
import getNextValue from '../common/getNextValue';
import stylesheet from './CustomFlatSelect.st.css';

export * from './CustomFlatSelectOption';

interface ISelfProps {
	id?: string;
	name?: string;
	defaultValue?: SelectValue;
	value?: SelectValue;
	multiple?: boolean;
	disabled?: boolean;
	children: ReactNode;
	onChange?(value: SelectValue, event: ChangeEvent);
}

interface IOptionProps {
	type: string;
	value: SelectValue;
	checked: boolean;
	disabled: boolean;
	name: string;
	optionId: string;
	id?: string;
	onChange(value: SelectValue, event: ChangeEvent);
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	HTMLAttributes<HTMLUListElement>
>;

interface IState {
	value: SelectValue;
}

export default class CustomFlatSelect extends PureComponent<IProps, IState> {

	static propTypes = {
		id:           PropTypes.string,
		name:         PropTypes.string,
		onChange:     PropTypes.func,
		defaultValue: SelectValuePropType,
		value:        SelectValuePropType,
		multiple:     PropTypes.bool,
		disabled:     PropTypes.bool,
		children:     PropTypes.node.isRequired
	};

	static defaultProps = {
		multiple: false,
		disabled: false
	};

	static getDerivedStateFromProps(
		{ value }: IProps,
		{ value: prevValue }: IState
	): IState {

		const nextValue = typeof value === 'undefined'
			? prevValue
			: value;

		if (nextValue === prevValue) {
			return null;
		}

		return {
			value: nextValue
		};
	}

	constructor(props) {

		super(props);

		const {
			defaultValue
		} = props;

		this.state = {
			value: defaultValue
		};
	}

	render() {

		const {
			id,
			name,
			multiple,
			disabled,
			children,
			...props
		} = this.props;
		const {
			value
		} = this.state;
		let activeDescendant: string = null;
		const options = Children.map(children, (child: ReactElement<any>) => {

			if (!child) {
				return null;
			}

			const {
				value: optionValue,
				children: optionLabel,
				...childProps
			} = child.props;
			const option = typeof optionValue === 'undefined'
				? optionLabel
				: optionValue;
			const checked = isCurrentValue(multiple, value, option);
			const props: IOptionProps = {
				...childProps,
				type:     multiple ? 'checkbox' : 'radio',
				value:    option,
				onChange: this.onChange,
				checked,
				disabled,
				name
			};

			if (typeof id === 'string') {

				props.optionId = `${id}-option-${option}`;

				if (checked && !multiple) {
					activeDescendant = props.optionId;
				}
			}

			return cloneElement(
				child,
				props
			);
		});

		return (
			<ul
				role='listbox'
				{...omit(props, [
					'onChange',
					'defaultValue',
					'value'
				])}
				{...stylesheet('root', {}, props)}
				id={id}
				aria-activedescendant={activeDescendant}
				aria-multiselectable={multiple}
				aria-disabled={disabled}
			>
				{options}
			</ul>
		);
	}

	@Bind()
	private onChange(inputNextValue: SelectValue, event: ChangeEvent) {

		const {
			value: valueProp,
			onChange,
			multiple,
			disabled
		} = this.props;

		if (disabled) {
			return;
		}

		const {
			value
		} = this.state;
		const nextValue = getNextValue(multiple, value, inputNextValue);

		if (nextValue === value) {
			return;
		}

		if (typeof valueProp === 'undefined') {
			this.setState(() => ({
				value: nextValue
			}));
		}

		if (typeof onChange === 'function') {
			onChange(nextValue, event);
		}
	}
}

import React, {
	Ref,
	ReactElement,
	ReactNode,
	CSSProperties,
	MouseEvent,
	ChangeEvent,
	PureComponent,
	Children,
	cloneElement
} from 'react';
import PropTypes from 'prop-types';
import {
	Listener,
	getAriaLabelProps
} from '../../helpers';
import isCurrentValue from '../common/isCurrentValue';
import getNextValue from '../common/getNextValue';
import Dropdown, {
	IProps as IDropdownProps,
	DropdownContent
} from '../Dropdown';
import { ICustomSelectOptionProps } from './CustomSelectOption';
import stylesheet from './CustomSelect.st.css';

export * from './CustomSelectFace';
export * from './CustomSelectOption';

interface ISelfProps {
	elementRef?: Ref<Dropdown>;
	id?: string;
	style?: CSSProperties;
	name?: string;
	value?: any;
	defaultValue?: any;
	placeholder?: string;
	multiple?: boolean;
	disabled?: boolean;
	children: ReactNode;
	onChange?(value, event: ChangeEvent): void;
	onChange?(value, name: string, event: ChangeEvent): void;
}

interface IOptionProps {
	type: string;
	value: any;
	checked: boolean;
	disabled: boolean;
	name: string;
	id?: string;
	onChange(value, event: ChangeEvent);
}

export type IProps = ISelfProps & IDropdownProps;

export default class CustomSelect extends PureComponent<IProps> {

	static propTypes = {
		elementRef:   PropTypes.func,
		id:           PropTypes.string,
		style:        PropTypes.object,
		name:         PropTypes.string,
		onChange:     PropTypes.func,
		defaultValue: PropTypes.any,
		value:        PropTypes.any,
		placeholder:  PropTypes.string,
		multiple:     PropTypes.bool,
		disabled:     PropTypes.bool,
		children:     PropTypes.node.isRequired
	};

	static defaultProps = {
		elementRef:   null,
		id:           null,
		style:        null,
		name:         null,
		onChange:     null,
		defaultValue: null,
		value:        null,
		placeholder:  null,
		multiple:     false,
		disabled:     false
	};

	static getDerivedStateFromProps({ value }, { value: prevValue }) {

		const nextValue = value === null
			? prevValue
			: value;

		if (nextValue === prevValue) {
			return null;
		}

		return {
			value: nextValue
		};
	}

	state: { value: any };
	dropdownRef: Dropdown = null;

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
			'aria-labelledby': ariaLabelledBy,
			'aria-label': ariaLabel,
			id,
			style,
			name,
			placeholder,
			multiple,
			disabled,
			children,
			...props
		} = this.props;

		const {
			value
		} = this.state;

		let faceChild = null;
		let label = multiple ? [] : '';
		let activeDescendant = null;

		const options = Children
			.toArray(children)
			.filter(Boolean)
			.map((child: ReactElement<any>, i) => {

				if (i === 0) {
					faceChild = child;
					return null;
				}

				const {
					value: optionValue,
					children: optionLabel
				} = child.props;

				const option = typeof optionValue === 'undefined'
					? optionLabel
					: optionValue;

				const checked = isCurrentValue(multiple, value, option);

				const props: IOptionProps = {
					type:     multiple ? 'checkbox' : 'radio',
					value:    option,
					onChange: this.onChange,
					checked,
					disabled,
					name
				};

				if (checked) {

					if (multiple) {
						(label as string[]).push(optionLabel);
					} else {
						label = optionLabel;
					}
				}

				if (typeof id === 'string') {

					props.id = `${id}-option-${option}`;

					if (checked) {
						activeDescendant = props.id;
					}
				}

				return cloneElement(child, props);
			});

		Reflect.deleteProperty(props, 'onChange');

		const ariaLabelProps = getAriaLabelProps({
			role:       'listbox',
			labelledBy: ariaLabelledBy,
			label:      ariaLabel || placeholder
		});

		return (
			<Dropdown
				{...props}
				{...stylesheet('root', {}, props)}
				ref={this.onDropdownRef}
				style={style}
				disabled={disabled}
			>
				{this.face(faceChild, label)}
				<DropdownContent
					{...ariaLabelProps}
					{...stylesheet('dropdownContent')}
					role='region'
					aria-multiselectable={multiple}
				>
					<ul
						{...ariaLabelProps}
						{...stylesheet('options')}
						onClick={this.onDropdownHide}
						aria-activedescendant={activeDescendant}
					>
						{options}
					</ul>
				</DropdownContent>
				{name && (
					<input
						type='hidden'
						name={name}
						value={value}
					/>
				)}
			</Dropdown>
		);
	}

	face(faceChild: ReactElement<any>, label: string|string[]) {

		const {
			multiple,
			placeholder,
			disabled
		} = this.props;

		const {
			children,
			...props
		} = faceChild.props;

		return children(
			(multiple ? (label as string[]).join(', ') : label)
			|| placeholder && (
				<span
					{...stylesheet('placeholder')}
				>
					{placeholder}
				</span>
			)
			|| (
				<i>&nbsp;</i>
			),
			{ ...props, disabled }
		);
	}

	@Listener()
	onDropdownRef(ref) {

		const {
			elementRef
		} = this.props;

		this.dropdownRef = ref;

		if (typeof elementRef === 'function') {
			elementRef(ref);
		}
	}

	@Listener()
	onDropdownHide(event: MouseEvent) {

		const {
			multiple
		} = this.props;

		const {
			dropdownRef
		} = this;

		if (!multiple && dropdownRef) {
			dropdownRef.toggleActiveState(false, event);
		}
	}

	@Listener()
	onChange(inputNextValue, event: ChangeEvent) {

		const {
			value: valueProp,
			name,
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

		if (valueProp === null) {
			this.setState(() => ({
				value: nextValue
			}));
		}

		if (typeof onChange === 'function') {

			if (name) {
				onChange(nextValue, name, event);
			} else {
				onChange(nextValue, event);
			}
		}
	}
}

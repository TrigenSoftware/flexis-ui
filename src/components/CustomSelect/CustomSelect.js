import React, {
	PureComponent,
	Children,
	Fragment,
	cloneElement
} from 'react';
import PropTypes from 'prop-types';
import {
	Stylable,
	Listener,
	generateId
} from '../../helpers';
import Dropdown, { DropdownContent } from '../Dropdown';
import stylesheet from './CustomSelect.st.css';

export * from './CustomSelectFace';
export * from './CustomSelectOption';

@Stylable(stylesheet)
export default class CustomSelect extends PureComponent {

	static propTypes = {
		elementRef:   PropTypes.func,
		style:        PropTypes.object,
		onChange:     PropTypes.func,
		name:         PropTypes.string,
		value:        PropTypes.any,
		defaultValue: PropTypes.any,
		placeholder:  PropTypes.string,
		multiple:     PropTypes.bool,
		disabled:     PropTypes.bool,
		children:     PropTypes.any.isRequired
	};

	static defaultProps = {
		elementRef:   null,
		style:        null,
		onChange:     null,
		name:         null,
		value:        null,
		defaultValue: null,
		placeholder:  null,
		multiple:     false,
		disabled:     false
	};

	static getDerivedStateFromProps({ value }, { value: prevValue }) {

		const nextValue = value === null
			? prevValue
			: value;

		if (nextValue == prevValue) {
			return null;
		}

		return {
			value: nextValue
		};
	}

	dropdownRef = null;

	constructor(props) {

		super(props);

		const {
			name,
			defaultValue
		} = props;

		this.privateName = name
			? false
			: generateId();

		this.state = {
			value: defaultValue
		};
	}

	render() {

		const {
			style,
			name: nameProp,
			multiple,
			disabled,
			children,
			...props
		} = this.props;

		const {
			value
		} = this.state;

		const name = nameProp || this.privateName;

		let faceChild = null,
			label = multiple ? [] : '';

		const options = Children
			.toArray(children)
			.filter(Boolean)
			.map((child, i) => {

				if (i == 0) {
					faceChild = child;
					return null;
				}

				const {
					value:    optionValue,
					children: optionLabel
				} = child.props;

				const option = typeof optionValue == 'undefined'
					? optionLabel
					: optionValue;

				const checked = this.isCurrentValue(value, option);

				const props = {
					type:     multiple ? 'checkbox' : 'radio',
					value:    option,
					onChange: this.onChange(),
					checked,
					disabled,
					name
				};

				if (checked) {

					if (multiple) {
						label.push(optionLabel);
					} else {
						label = optionLabel;
					}
				}

				return cloneElement(
					child,
					props
				);
			});

		Reflect.deleteProperty(props, 'onChange');

		return (
			<Dropdown
				{...props}
				ref={this.onDropdownRef()}
				style={style}
				disabled={disabled}
			>
				<Fragment>
					{this.face(faceChild, label)}
					{nameProp && (
						<input
							type='hidden'
							name={nameProp}
							value={value}
						/>
					)}
				</Fragment>
				<DropdownContent>
					<ul
						className='options'
						onClick={this.onDropdownHide()}
					>
						{options}
					</ul>
				</DropdownContent>
			</Dropdown>
		);
	}

	face(faceChild, label) {

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
			(multiple ? label.join(', ') : label)
			|| placeholder && (
				<span className='placeholder'>
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

		if (typeof elementRef == 'function') {
			elementRef(ref);
		}
	}

	@Listener()
	onDropdownHide(event) {

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
	onChange(inputNextValue, event) {

		const {
			value: valueProp,
			onChange,
			disabled
		} = this.props;

		if (disabled) {
			return;
		}

		const {
			value
		} = this.state;

		const nextValue = this.getNextValue(inputNextValue);

		if (nextValue === value) {
			return;
		}

		if (valueProp === null) {
			this.setState(() => ({
				value: nextValue
			}));
		}

		if (typeof onChange == 'function') {
			onChange(nextValue, event);
		}
	}

	isCurrentValue(value, option) {

		const {
			multiple
		} = this.props;

		if (multiple) {

			if (Array.isArray(value)) {
				return value.includes(option);
			}

			return false;
		}

		return value == option;
	}

	getNextValue(nextValue) {

		const {
			multiple
		} = this.props;

		const {
			value
		} = this.state;

		if (!multiple) {
			return nextValue;
		}

		const nextArrayValue = Array.isArray(value) ? [...value] : [],
			index = nextArrayValue.indexOf(nextValue);

		if (~index) {
			nextArrayValue.splice(index, 1);
		} else {
			nextArrayValue.push(nextValue);
		}

		return nextArrayValue;
	}
}

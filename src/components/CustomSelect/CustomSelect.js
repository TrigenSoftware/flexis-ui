import React, {
	PureComponent,
	Children,
	Fragment,
	cloneElement
} from 'react';
import PropTypes from 'prop-types';
import { Listener } from '../../helpers';
import isCurrentValue from '../common/isCurrentValue';
import getNextValue from '../common/getNextValue';
import Dropdown, { DropdownContent } from '../Dropdown';
import stylesheet from './CustomSelect.st.css';

export * from './CustomSelectFace';
export * from './CustomSelectOption';

export default class CustomSelect extends PureComponent {

	static propTypes = {
		elementRef:   PropTypes.func,
		style:        PropTypes.object,
		name:         PropTypes.string,
		onChange:     PropTypes.func,
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
		name:         null,
		onChange:     null,
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
			defaultValue
		} = props;

		this.state = {
			value: defaultValue
		};
	}

	render() {

		const {
			style,
			name,
			multiple,
			disabled,
			children,
			...props
		} = this.props;

		const {
			value
		} = this.state;

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

				const checked = isCurrentValue(multiple, value, option);

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
				{...stylesheet('root', {}, props)}
				ref={this.onDropdownRef()}
				style={style}
				disabled={disabled}
			>
				<Fragment>
					{this.face(faceChild, label)}
					{name && (
						<input
							type='hidden'
							name={name}
							value={value}
						/>
					)}
				</Fragment>
				<DropdownContent
					{...stylesheet('dropdownContent')}
				>
					<ul
						{...stylesheet('options')}
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

		if (typeof onChange == 'function') {

			if (name) {
				onChange(nextValue, name, event);
			} else {
				onChange(nextValue, event);
			}
		}
	}
}

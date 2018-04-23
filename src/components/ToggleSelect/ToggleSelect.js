import React, {
	PureComponent,
	Children,
	cloneElement
} from 'react';
import PropTypes from 'prop-types';
import {
	Stylable,
	getHtmlProps,
	generateId
} from '../../helpers';
import stylesheet from './ToggleSelect.st.css';

export * from './ToggleSelectOption';

@Stylable(stylesheet)
export default class ToggleSelect extends PureComponent {

	static propTypes = {
		onChange:     PropTypes.func,
		name:         PropTypes.string,
		value:        PropTypes.any,
		defaultValue: PropTypes.any,
		multiple:     PropTypes.bool,
		disabled:     PropTypes.bool,
		children:     PropTypes.any.isRequired
	};

	static defaultProps = {
		onChange:     null,
		name:         null,
		value:        null,
		defaultValue: null,
		multiple:     false,
		disabled:     false
	};

	constructor(props) {

		super(props);

		const {
			name
		} = props;

		this.privateName = name
			? false
			: generateId();
	}

	render() {

		const {
			name: nameProp,
			onChange,
			value,
			defaultValue,
			multiple,
			disabled,
			children,
			...props
		} = this.props;

		const name = nameProp || this.privateName;

		const options = Children
			.toArray(children)
			.filter(Boolean)
			.map((child) => {

				const {
					value:    optionValue,
					children: optionLabel
				} = child.props;

				const option = typeof optionValue == 'undefined'
					? optionLabel
					: optionValue;

				const props = {
					type:  multiple ? 'checkbox' : 'radio',
					value: option,
					onChange,
					disabled,
					name
				};

				if (this.isCurrentValue(defaultValue, option)) {
					props.defaultChecked = true;
				} else
				if (this.isCurrentValue(value, option)) {
					props.checked = true;
				}

				return cloneElement(
					child,
					props
				);
			});

		return (
			<ul
				{...getHtmlProps(props)}
			>
				{options}
			</ul>
		);
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
}

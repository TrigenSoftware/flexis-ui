import React, {
	PureComponent,
	Children,
	cloneElement
} from 'react';
import PropTypes from 'prop-types';
import {
	Listener,
	getHtmlProps,
	generateId
} from '../../helpers';
import stylesheet from './ToggleSelect.st.css';

export * from './ToggleSelectOption';

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
					type:     multiple ? 'checkbox' : 'radio',
					checked:  this.isCurrentValue(value, option),
					value:    option,
					onChange: this.onChange(),
					disabled,
					name
				};

				return cloneElement(
					child,
					props
				);
			});

		return (
			<ul
				{...getHtmlProps(props, ['onChange'])}
				{...stylesheet('root', {}, props)}
			>
				{options}
			</ul>
		);
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

import React, {
	PureComponent,
	Children,
	cloneElement
} from 'react';
import PropTypes from 'prop-types';
import {
	Listener,
	getHtmlProps
} from '../../helpers';
import isCurrentValue from '../common/isCurrentValue';
import getNextValue from '../common/getNextValue';
import stylesheet from './ToggleSelect.st.css';

export * from './ToggleSelectOption';

export default class ToggleSelect extends PureComponent {

	static propTypes = {
		id:           PropTypes.string,
		name:         PropTypes.string,
		onChange:     PropTypes.func,
		value:        PropTypes.any,
		defaultValue: PropTypes.any,
		multiple:     PropTypes.bool,
		disabled:     PropTypes.bool,
		children:     PropTypes.node.isRequired
	};

	static defaultProps = {
		id:           null,
		name:         null,
		onChange:     null,
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

		let activeDescendant = null;

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

				const checked = isCurrentValue(multiple, value, option);

				const props = {
					type:     multiple ? 'checkbox' : 'radio',
					value:    option,
					onChange: this.onChange(),
					checked,
					disabled,
					name
				};

				if (typeof id == 'string') {

					props.id = `${id}-option-${option}`;

					if (checked) {
						activeDescendant = props.id;
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
				{...getHtmlProps(props, ['onChange'])}
				{...stylesheet('root', {}, props)}
				aria-activedescendant={activeDescendant}
				aria-multiselectable={multiple}
			>
				{options}
			</ul>
		);
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

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	Stylable,
	Listener,
	getHtmlProps,
	valueOrUndef
} from '../../helpers';
import stylesheet from './Checkbox.st.css';

@Stylable(stylesheet)
export default class Checkbox extends PureComponent {

	static propTypes = {
		elementRef:     PropTypes.func,
		style:          PropTypes.object,
		onChange:       PropTypes.func,
		value:          PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]),
		checked:        PropTypes.bool,
		defaultChecked: PropTypes.bool,
		focus:          PropTypes.bool,
		hover:          PropTypes.bool,
		active:         PropTypes.bool
	};

	static defaultProps = {
		elementRef:     null,
		style:          null,
		onChange:       null,
		value:          null,
		checked:        null,
		defaultChecked: null,
		focus:          false,
		hover:          false,
		active:         false
	};

	render() {

		const {
			elementRef,
			style,
			value,
			checked,
			defaultChecked,
			focus,
			hover,
			active,
			...props
		} = this.props;

		return (
			<label
				style={style}
				style-state={{
					pseudoFocus:  focus,
					pseudoHover:  hover,
					pseudoActive: active
				}}
			>
				<input
					{...getHtmlProps(props)}
					ref={valueOrUndef(elementRef)}
					className='checkbox'
					type='checkbox'
					value={valueOrUndef(value)}
					checked={valueOrUndef(checked)}
					defaultChecked={valueOrUndef(defaultChecked)}
					onChange={this.onChange()}
				/>
				<div className='face'/>
			</label>
		);
	}

	@Listener()
	onChange(event) {

		const {
			onChange,
			value
		} = this.props;

		if (typeof onChange == 'function') {
			onChange(
				value != null
					? event.target.value
					: event.target.checked,
				event
			);
		}
	}
}

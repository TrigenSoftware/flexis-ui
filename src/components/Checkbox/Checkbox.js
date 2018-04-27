import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	Listener,
	getHtmlProps,
	valueOrUndef
} from '../../helpers';
import stylesheet from './Checkbox.st.css';

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
		defaultChecked: PropTypes.bool
	};

	static defaultProps = {
		elementRef:     null,
		style:          null,
		onChange:       null,
		value:          null,
		checked:        null,
		defaultChecked: null
	};

	render() {

		const {
			elementRef,
			style,
			value,
			checked,
			defaultChecked,
			...props
		} = this.props;

		return (
			<label
				{...stylesheet('root', {}, props)}
				style={style}
			>
				<input
					{...getHtmlProps(props)}
					{...stylesheet('checkbox')}
					ref={elementRef}
					type='checkbox'
					value={valueOrUndef(value)}
					checked={valueOrUndef(checked)}
					defaultChecked={valueOrUndef(defaultChecked)}
					onChange={this.onChange()}
				/>
				<div
					{...stylesheet('face')}
				/>
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
					? value
					: event.target.checked,
				event
			);
		}
	}
}

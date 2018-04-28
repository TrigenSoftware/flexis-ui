import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	Listener,
	getHtmlProps,
	valueOrUndef
} from '../../helpers';
import stylesheet from './Switch.st.css';

export default class Switch extends PureComponent {

	static propTypes = {
		elementRef:     PropTypes.func,
		style:          PropTypes.object,
		type:           PropTypes.oneOf([
			'checkbox',
			'radio'
		]).isRequired,
		name:           PropTypes.string,
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
		name:           null,
		onChange:       null,
		value:          null,
		checked:        null,
		defaultChecked: null
	};

	render() {

		const {
			elementRef,
			style,
			type,
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
					{...stylesheet('input')}
					ref={elementRef}
					type={type}
					onChange={this.onChange()}
					value={valueOrUndef(value)}
					checked={valueOrUndef(checked)}
					defaultChecked={valueOrUndef(defaultChecked)}
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
			name,
			onChange,
			value
		} = this.props;

		if (typeof onChange == 'function') {

			const nextValue = value != null
				? value
				: event.target.checked;

			if (name) {
				onChange(nextValue, name, event);
			} else {
				onChange(nextValue, event);
			}
		}
	}
}

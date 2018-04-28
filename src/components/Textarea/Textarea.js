import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	Listener,
	getHtmlProps,
	valueOrUndef
} from '../../helpers';
import stylesheet from './Textarea.st.css';

export default class Textarea extends PureComponent {

	static propTypes = {
		elementRef:   PropTypes.func,
		name:         PropTypes.string,
		onChange:     PropTypes.func,
		value:        PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]),
		defaultValue: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		])
	};

	static defaultProps = {
		elementRef:   null,
		name:         null,
		onChange:     null,
		value:        null,
		defaultValue: null
	};

	render() {

		const {
			elementRef,
			value,
			defaultValue,
			...props
		} = this.props;

		return (
			<textarea
				{...getHtmlProps(props)}
				{...stylesheet('root', {}, props)}
				ref={elementRef}
				onChange={this.onChange()}
				value={valueOrUndef(value)}
				defaultValue={valueOrUndef(defaultValue)}
			/>
		);
	}

	@Listener()
	onChange(event) {

		const {
			name,
			onChange
		} = this.props;

		if (typeof onChange == 'function') {

			const nextValue = event.target.value;

			if (name) {
				onChange(nextValue, name, event);
			} else {
				onChange(nextValue, event);
			}
		}
	}
}

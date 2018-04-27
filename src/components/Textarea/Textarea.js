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
			onChange
		} = this.props;

		if (typeof onChange == 'function') {
			onChange(
				event.target.value,
				event
			);
		}
	}
}

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	Listener,
	getHtmlProps
} from '../../helpers';
import stylesheet from './FileSelect.st.css';

export default class FileSelect extends PureComponent {

	static propTypes = {
		elementRef: PropTypes.func,
		style:      PropTypes.object,
		name:       PropTypes.string,
		onChange:   PropTypes.func,
		disabled:   PropTypes.bool,
		children:   PropTypes.any
	};

	static defaultProps = {
		elementRef: null,
		style:      null,
		name:       null,
		onChange:   null,
		disabled:   false,
		children:   null
	};

	render() {

		const {
			elementRef,
			style,
			disabled,
			children,
			...props
		} = this.props;

		return (
			<label
				{...stylesheet('root', {
					disabled
				}, props)}
				style={style}
			>
				{children}
				<input
					{...getHtmlProps(props)}
					{...stylesheet('input')}
					ref={elementRef}
					type='file'
					onChange={this.onChange()}
					disabled={disabled}
				/>
				<div
					{...stylesheet('border')}
				/>
			</label>
		);
	}

	@Listener()
	onChange(event) {

		const {
			name,
			onChange
		} = this.props;

		if (typeof onChange == 'function') {

			const nextValue = Array.from(event.target.files);

			if (name) {
				onChange(nextValue, name, event);
			} else {
				onChange(nextValue, event);
			}
		}
	}
}

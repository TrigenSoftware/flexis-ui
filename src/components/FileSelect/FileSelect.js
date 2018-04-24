import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	Stylable,
	Listener,
	getHtmlProps,
	valueOrUndef
} from '../../helpers';
import stylesheet from './FileSelect.st.css';

@Stylable(stylesheet)
export default class FileSelect extends PureComponent {

	static propTypes = {
		elementRef: PropTypes.func,
		style:      PropTypes.object,
		onChange:   PropTypes.func,
		disabled:   PropTypes.bool,
		children:   PropTypes.any
	};

	static defaultProps = {
		elementRef: null,
		style:      null,
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
				style={style}
				style-state={{
					disabled
				}}
			>
				{children}
				<input
					{...getHtmlProps(props)}
					ref={valueOrUndef(elementRef)}
					className='input'
					type='file'
					onChange={this.onChange()}
					disabled={disabled}
				/>
			</label>
		);
	}

	@Listener()
	onChange(event) {

		const {
			onChange
		} = this.props;

		if (typeof onChange == 'function') {
			onChange(
				Array.from(event.target.files),
				event
			);
		}
	}
}

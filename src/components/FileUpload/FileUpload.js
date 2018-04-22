import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	Stylable,
	Listener,
	getHtmlProps,
	valueOrUndef
} from '../../helpers';
import stylesheet from './FileUpload.st.css';

@Stylable(stylesheet)
export default class FileUpload extends PureComponent {

	static propTypes = {
		elementRef: PropTypes.func,
		style:      PropTypes.object,
		onChange:   PropTypes.func,
		children:   PropTypes.any
	};

	static defaultProps = {
		elementRef: null,
		style:      null,
		onChange:   null,
		children:   null
	};

	render() {

		const {
			elementRef,
			style,
			children,
			...props
		} = this.props;

		return (
			<label
				style={style}
			>
				{children}
				<input
					{...getHtmlProps(props)}
					ref={valueOrUndef(elementRef)}
					className='input'
					type='file'
					onChange={this.onChange()}
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

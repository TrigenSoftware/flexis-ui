import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	Stylable,
	Listener,
	getHtmlProps
} from '../helpers';
import stylesheet from './FileUpload.st.css';

@Stylable(stylesheet)
export default class FileUpload extends PureComponent {

	static propTypes = {
		style:    PropTypes.object,
		onChange: PropTypes.func,
		children: PropTypes.any
	};

	static defaultProps = {
		style:    null,
		onChange: null,
		children: null
	};

	render() {

		const {
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
					className='input'
					type='file'
					onChange={this.onChange()}
				/>
			</label>
		);
	}

	@Listener()
	onChange({ target: { files } }) {

		const {
			onChange
		} = this.props;

		if (typeof onChange == 'function') {
			onChange(Array.from(files));
		}
	}
}

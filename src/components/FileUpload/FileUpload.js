import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	stylable,
	getHtmlProps
} from '../helpers';
import stylesheet from './FileUpload.st.css';

@stylable(stylesheet)
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
			onChange,
			children,
			...props
		} = this.props;

		return (
			<label
				style={style}
			>
				{children}
				<input
					className='input'
					type='file'
					onChange={({ target: { files } }) => {

						if (typeof onChange == 'function') {
							onChange(Array.from(files));
						}
					}}
					{...getHtmlProps(props)}
				/>
			</label>
		);
	}
}

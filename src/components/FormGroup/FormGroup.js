import React from 'react';
import PropTypes from 'prop-types';
import { getHtmlProps } from '../../helpers';
import stylesheet from './FormGroup.st.css';

FormGroup.propTypes = {
	label: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	children: PropTypes.node.isRequired
};

FormGroup.defaultProps = {
	label: null
};

export default function FormGroup({
	label,
	children,
	...props
}) {
	return (
		<div
			{...getHtmlProps(props)}
			{...stylesheet('root', {}, props)}
		>
			{typeof label != 'string' ? label : (
				<label
					{...stylesheet('label')}
				>
					{label}
				</label>
			)}
			{children}
		</div>
	);
}

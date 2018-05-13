import { cloneElement } from 'react';
import PropTypes from 'prop-types';
import stylesheet from './VisuallyHidden.st.css';

VisuallyHidden.propTypes = {
	children: PropTypes.element.isRequired
};

export default function VisuallyHidden({
	children,
	...props
}) {
	return cloneElement(children, stylesheet('root', {}, props));
}

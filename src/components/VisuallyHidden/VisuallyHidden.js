import { cloneElement } from 'react';
import PropTypes from 'prop-types';
import stylesheet from './VisuallyHidden.st.css';

VisuallyHidden.propTypes = {
	focusable: PropTypes.bool,
	children:  PropTypes.element.isRequired
};

VisuallyHidden.defaultProps = {
	focusable: false
};

export default function VisuallyHidden({
	focusable,
	children,
	...props
}) {
	return cloneElement(children, stylesheet('root', {
		focusable
	}, props));
}

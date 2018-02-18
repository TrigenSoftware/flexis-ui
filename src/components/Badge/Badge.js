import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	stylable,
	getHtmlProps
} from '../helpers';
import * as config from '../config';
import stylesheet from './Badge.st.css';

export {
	default as BadgeContainer
} from './BadgeContainer';

export const colors = [
	...config.colors
];

export const sizes = [
	...config.sizes
];

@stylable(stylesheet)
export default class Badge extends PureComponent {

	static propTypes = {
		label:     PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]),
		children:  PropTypes.any,
		color:     PropTypes.oneOf(colors),
		size:      PropTypes.oneOf(sizes)
	};

	static defaultProps = {
		label:     null,
		children:  null,
		color:     null,
		size:      null
	};

	render() {

		const {
			label,
			children,
			color,
			size,
			...props
		} = this.props;

		return (
			<label
				style-state={{
					[`${color}Color`]: color,
					[`${size}Size`]:   size
				}}
				{...getHtmlProps(props)}
			>
				{label || children}
			</label>
		);
	}
}

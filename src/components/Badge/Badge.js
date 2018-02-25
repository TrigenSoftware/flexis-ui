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
		color:    PropTypes.oneOf(colors),
		size:     PropTypes.oneOf(sizes),
		children: PropTypes.any
	};

	static defaultProps = {
		color:    null,
		size:     null,
		children: null
	};

	render() {

		const {
			color,
			size,
			children,
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
				{children}
			</label>
		);
	}
}

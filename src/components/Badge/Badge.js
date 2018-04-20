import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	Stylable,
	getHtmlProps
} from '../helpers';
import stylesheet from './Badge.st.css';

export {
	default as BadgeContainer
} from './BadgeContainer';

@Stylable(stylesheet)
export default class Badge extends PureComponent {

	static propTypes = {
		children: PropTypes.any
	};

	static defaultProps = {
		children: null
	};

	render() {

		const {
			children,
			...props
		} = this.props;

		return (
			<label
				{...getHtmlProps(props)}
			>
				{children}
			</label>
		);
	}
}

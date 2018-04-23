import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	Stylable,
	getHtmlProps
} from '../../helpers';
import stylesheet from './Menu.st.css';

export * from './MenuItem';
export * from './MenuButton';

@Stylable(stylesheet)
export default class Menu extends PureComponent {

	static propTypes = {
		children: PropTypes.any.isRequired
	};

	render() {

		const {
			children,
			...props
		} = this.props;

		return (
			<ul
				{...getHtmlProps(props)}
			>
				{children}
			</ul>
		);
	}
}

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	Stylable,
	getHtmlProps
} from '../../helpers';
import stylesheet from './Table.st.css';

export * from './TableHead';
export * from './TableBody';
export * from './TableRow';
export * from './TableCell';

@Stylable(stylesheet)
export default class Table extends PureComponent {

	static propTypes = {
		children: PropTypes.any.isRequired
	}

	render() {

		const {
			children,
			...props
		} = this.props;

		return (
			<table
				{...getHtmlProps(props)}
			>
				{children}
			</table>
		);
	}
}

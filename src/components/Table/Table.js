import React, { PureComponent } from 'react';
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

	render() {
		return (
			<table
				{...getHtmlProps(this.props)}
			/>
		);
	}
}

import React from 'react';
import { getHtmlProps } from '../../helpers';
import stylesheet from './Table.st.css';

export function TableRow(props) {
	return (
		<tr
			{...getHtmlProps(props)}
			{...stylesheet('row', {}, props)}
		/>
	);
}

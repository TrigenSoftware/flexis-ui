import React from 'react';
import { getHtmlProps } from '../../helpers';
import stylesheet from './Table.st.css';

export function TableBody(props) {
	return (
		<tbody
			{...getHtmlProps(props)}
			{...stylesheet('body', {}, props)}
		/>
	);
}

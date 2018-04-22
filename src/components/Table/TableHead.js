import React from 'react';
import { getHtmlProps } from '../../helpers';
import stylesheet from './Table.st.css';

export function TableHead(props) {
	return (
		<thead
			{...getHtmlProps(props)}
			{...stylesheet('head', {}, props)}
		/>
	);
}

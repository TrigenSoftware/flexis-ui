import React, {
	AllHTMLAttributes,
	ReactElement,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes,
	getHtmlProps
} from '../../helpers';
import stylesheet from './Table.st.css';

interface ISelfProps {
	children: ReactElement<any>|ReactElement<any>[];
}

export type ITableRowProps = CombinePropsAndAttributes<
	ISelfProps,
	AllHTMLAttributes<HTMLTableRowElement>
>;

export class TableRow extends PureComponent<ITableRowProps> {

	static propTypes = {
		children: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.arrayOf(PropTypes.element)
		]).isRequired
	};

	render() {

		const {
			children,
			...props
		} = this.props;

		return (
			<tr
				{...getHtmlProps(props)}
				{...stylesheet('row', {}, props)}
			>
				{children}
			</tr>
		);
	}
}

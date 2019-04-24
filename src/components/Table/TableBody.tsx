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

export type ITableBodyProps = CombinePropsAndAttributes<
	ISelfProps,
	AllHTMLAttributes<HTMLTableSectionElement>
>;

export class TableBody extends PureComponent<ITableBodyProps> {

	static propTypes = {
		children: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.arrayOf(PropTypes.oneOfType([
				PropTypes.element,
				PropTypes.arrayOf(PropTypes.element)
			]))
		]).isRequired
	};

	render() {

		const {
			children,
			...props
		} = this.props;

		return (
			<tbody
				{...getHtmlProps(props)}
				{...stylesheet('body', {}, props)}
			>
				{children}
			</tbody>
		);
	}
}

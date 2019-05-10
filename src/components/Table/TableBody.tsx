import React, {
	HTMLAttributes,
	ReactElement,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes
} from '../../helpers';
import stylesheet from './Table.st.css';

interface ISelfProps {
	children: ReactElement<any>|ReactElement<any>[];
}

export type ITableBodyProps = CombinePropsAndAttributes<
	ISelfProps,
	HTMLAttributes<HTMLTableSectionElement>
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
				{...props}
				{...stylesheet('body', {}, props)}
			>
				{children}
			</tbody>
		);
	}
}

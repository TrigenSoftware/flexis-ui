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

export type ITableFootProps = CombinePropsAndAttributes<
	ISelfProps,
	AllHTMLAttributes<HTMLTableSectionElement>
>;

export class TableFoot extends PureComponent<ITableFootProps> {

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
			<tfoot
				{...getHtmlProps(props)}
				{...stylesheet('foot', {}, props)}
			>
				{children}
			</tfoot>
		);
	}
}

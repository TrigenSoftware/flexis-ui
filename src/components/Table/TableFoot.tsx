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

export type ITableFootProps = CombinePropsAndAttributes<
	ISelfProps,
	HTMLAttributes<HTMLTableSectionElement>
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
				{...props}
				{...stylesheet('foot', {}, props)}
			>
				{children}
			</tfoot>
		);
	}
}

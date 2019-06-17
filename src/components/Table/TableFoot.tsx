import React, {
	HTMLAttributes,
	ReactNode,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes
} from '../../helpers';
import stylesheet from './Table.st.css';

interface ISelfProps {
	children: ReactNode;
}

export type ITableFootProps = CombinePropsAndAttributes<
	ISelfProps,
	HTMLAttributes<HTMLTableSectionElement>
>;

export class TableFoot extends PureComponent<ITableFootProps> {

	static propTypes = {
		children: PropTypes.node.isRequired
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

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

export type ITableHeadProps = CombinePropsAndAttributes<
	ISelfProps,
	HTMLAttributes<HTMLTableSectionElement>
>;

export class TableHead extends PureComponent<ITableHeadProps> {

	static propTypes = {
		children: PropTypes.node.isRequired
	};

	render() {

		const {
			children,
			...props
		} = this.props;

		return (
			<thead
				{...props}
				{...stylesheet('head', {}, props)}
			>
				{children}
			</thead>
		);
	}
}

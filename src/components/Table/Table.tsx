import React, {
	TableHTMLAttributes,
	ReactNode,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes
} from '../../helpers';
import stylesheet from './Table.st.css';

export * from './TableHead';
export * from './TableBody';
export * from './TableFoot';
export * from './TableRow';
export * from './TableCell';

interface ISelfProps {
	children: ReactNode;
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	TableHTMLAttributes<HTMLTableElement>
>;

export default class Table extends PureComponent<IProps> {

	static propTypes = {
		children: PropTypes.node.isRequired
	};

	render() {

		const {
			children,
			...props
		} = this.props;

		return (
			<table
				{...props}
				{...stylesheet('root', {}, props)}
			>
				{children}
			</table>
		);
	}
}

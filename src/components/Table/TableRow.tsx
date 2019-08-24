import React, {
	HTMLAttributes,
	ReactNode,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes
} from '../../helpers';
import {
	style,
	classes
} from './Table.st.css';

interface ISelfProps {
	children: ReactNode;
}

export type ITableRowProps = CombinePropsAndAttributes<
	ISelfProps,
	HTMLAttributes<HTMLTableRowElement>
>;

export class TableRow extends PureComponent<ITableRowProps> {

	static propTypes = {
		children: PropTypes.node.isRequired
	};

	render() {

		const {
			className,
			children,
			...props
		} = this.props;

		return (
			<tr
				{...props}
				className={style(classes.row, className)}
			>
				{children}
			</tr>
		);
	}
}

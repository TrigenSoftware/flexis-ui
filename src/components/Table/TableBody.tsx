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

export type ITableBodyProps = CombinePropsAndAttributes<
	ISelfProps,
	HTMLAttributes<HTMLTableSectionElement>
>;

export class TableBody extends PureComponent<ITableBodyProps> {

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
			<tbody
				{...props}
				className={style(classes.body, className)}
			>
				{children}
			</tbody>
		);
	}
}

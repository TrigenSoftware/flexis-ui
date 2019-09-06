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
			className,
			children,
			...props
		} = this.props;

		return (
			<thead
				{...props}
				className={style(classes.head, className)}
			>
				{children}
			</thead>
		);
	}
}

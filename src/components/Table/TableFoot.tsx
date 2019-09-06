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
			className,
			children,
			...props
		} = this.props;

		return (
			<tfoot
				{...props}
				className={style(classes.foot, className)}
			>
				{children}
			</tfoot>
		);
	}
}

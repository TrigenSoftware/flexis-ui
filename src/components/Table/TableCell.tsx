import React, {
	ThHTMLAttributes,
	TdHTMLAttributes,
	ReactNode,
	MouseEvent,
	KeyboardEvent,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes,
	Bind,
	omit,
	modulo
} from '../../helpers';
import isKeyboardClick from '../common/isKeyboardClick';
import {
	style,
	classes
} from './Table.st.css';

export enum Order {
	None = 0,
	Asc = 1,
	Desc = -1
}

interface ISelfProps {
	head?: boolean;
	order?: Order;
	children?: ReactNode;
	onOrderChange?(order: Order, event: MouseEvent);
}

export type ITableCellProps = CombinePropsAndAttributes<
	ISelfProps,
	ThHTMLAttributes<HTMLTableHeaderCellElement>
> | CombinePropsAndAttributes<
	ISelfProps,
	TdHTMLAttributes<HTMLTableDataCellElement>
>;

export const OrderValues: Order[] = Object.values(Order).filter(_ => typeof _ === 'number');

const buttonRole = {
	role:     'button',
	tabIndex: 0
};

export class TableCell extends PureComponent<ITableCellProps> {

	static propTypes = {
		head:          PropTypes.bool,
		onOrderChange: PropTypes.func,
		order:         PropTypes.oneOf(OrderValues),
		children:      PropTypes.node
	};

	static defaultProps = {
		head: false
	};

	render() {

		const {
			className,
			head,
			order,
			children,
			...props
		} = this.props;
		const Cell = head ? 'th' : 'td';
		const isOrder = head && typeof order === 'number';
		const buttonLikeProps = isOrder ? buttonRole : {};
		const buttonLikeListeners = isOrder
			? { onKeyPress: this.onKeyPress }
			: {};

		return (
			<Cell
				{...buttonLikeProps}
				{...omit(props, ['onOrderChange'])}
				className={style(classes.cell, {
					head,
					orderNone: isOrder && order === 0,
					orderAsc:  isOrder && order === 1,
					orderDesc: isOrder && order === -1
				}, className)}
				{...buttonLikeListeners}
				onClick={this.onOrderChange}
			>
				{children}
			</Cell>
		);
	}

	@Bind()
	private onOrderChange(event: MouseEvent<HTMLTableCellElement>) {

		const {
			onClick,
			onOrderChange,
			head,
			order
		} = this.props;

		if (head
			&& typeof order === 'number'
			&& typeof onOrderChange === 'function'
		) {
			onOrderChange(
				OrderValues[modulo(
					OrderValues.indexOf(order) + 1,
					OrderValues.length
				)],
				event
			);
		}

		if (typeof onClick === 'function') {
			onClick(event);
		}
	}

	@Bind()
	private onKeyPress(event: KeyboardEvent<HTMLTableCellElement>) {

		const {
			onKeyPress
		} = this.props;
		const {
			key
		} = event;

		if (isKeyboardClick(key)) {
			this.onOrderChange(null);
		}

		if (typeof onKeyPress === 'function') {
			onKeyPress(event);
		}
	}
}

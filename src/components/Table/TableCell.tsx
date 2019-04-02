import React, {
	AllHTMLAttributes,
	ReactNode,
	MouseEvent,
	KeyboardEvent,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes,
	Listener,
	getHtmlProps,
	modulo
} from '../../helpers';
import stylesheet from './Table.st.css';

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
	AllHTMLAttributes<HTMLTableCellElement>
>;

const buttonRole = {
	role:     'button',
	tabIndex: '0'
};
const orderValues: number[] = Object.values(Order).filter(_ => typeof _ === 'number');

export class TableCell extends PureComponent<ITableCellProps> {

	static propTypes = {
		head:          PropTypes.bool,
		onOrderChange: PropTypes.func,
		order:         PropTypes.oneOf(orderValues),
		children:      PropTypes.node
	};

	static defaultProps = {
		head:          false,
		onOrderChange: null,
		order:         null,
		children:      null
	};

	render() {

		const {
			head,
			order,
			children,
			...props
		} = this.props;

		const Cell = head ? 'th' : 'td';
		const isOrder = head && typeof order === 'number';
		const orderButton = isOrder ? buttonRole : {};

		return (
			<Cell
				{...orderButton}
				{...getHtmlProps(props)}
				{...stylesheet('cell', {
					head,
					orderNone: isOrder && order === 0,
					orderAsc:  isOrder && order === 1,
					orderDesc: isOrder && order === -1
				}, props)}
				onClick={this.onOrderChange}
				onKeyPress={this.onKeyPress}
			>
				{children}
			</Cell>
		);
	}

	@Listener()
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
				orderValues[modulo(
					orderValues.indexOf(order) + 1,
					orderValues.length
				)],
				event
			);
		}

		if (typeof onClick === 'function') {
			onClick(event);
		}
	}

	@Listener()
	private onKeyPress(event: KeyboardEvent<HTMLTableCellElement>) {

		const {
			key
		} = event;

		if (key !== ' ' && key !== 'Enter') {
			return;
		}

		const {
			onKeyPress
		} = this.props;

		this.onOrderChange(null);

		if (typeof onKeyPress === 'function') {
			onKeyPress(event);
		}
	}
}

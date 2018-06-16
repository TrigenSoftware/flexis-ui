import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	Listener,
	getHtmlProps,
	modulo
} from '../../helpers';
import stylesheet from './Table.st.css';

export const Order = {
	None: 0,
	Asc:  1,
	Desc: -1
};

const orderValues = Object.values(Order);

export class TableCell extends PureComponent {

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

		return (
			<Cell
				{...getHtmlProps(props)}
				{...stylesheet('cell', {
					head,
					orderNone: head && order === 0,
					orderAsc:  head && order === 1,
					orderDesc: head && order === -1
				}, props)}
				onClick={this.onOrderChange()}
			>
				{children}
			</Cell>
		);
	}

	@Listener()
	onOrderChange(event) {

		const {
			onClick, // eslint-disable-line
			onOrderChange,
			head,
			order
		} = this.props;

		if (head
			&& typeof order == 'number'
			&& typeof onOrderChange == 'function'
		) {
			onOrderChange(
				orderValues[modulo(
					orderValues.indexOf(order) + 1,
					orderValues.length
				)],
				event
			);
		}

		if (typeof onClick == 'function') {
			onClick(event);
		}
	}
}

import React, {
	LiHTMLAttributes,
	ReactNode,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes
} from '../../helpers';
import stylesheet from './Menu.st.css';

interface ISelfProps {
	children: ReactNode;
}

export type IMenuItemProps = CombinePropsAndAttributes<
	ISelfProps,
	LiHTMLAttributes<HTMLLIElement>
>;

export class MenuItem extends PureComponent<IMenuItemProps> {

	static propTypes = {
		children: PropTypes.node.isRequired
	};

	render() {

		const {
			children,
			...props
		} = this.props;

		return (
			<li
				role='menuitem'
				{...props}
				{...stylesheet('item', {}, props)}
			>
				{children}
			</li>
		);
	}
}

import React, {
	LiHTMLAttributes,
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
} from './Menu.st.css';

interface ISelfProps {
	children?: ReactNode;
}

export type IMenuItemSeparatorProps = CombinePropsAndAttributes<
	ISelfProps,
	LiHTMLAttributes<HTMLLIElement>
>;

export class MenuItemSeparator extends PureComponent<IMenuItemSeparatorProps> {

	static propTypes = {
		children: PropTypes.node
	};

	render() {

		const {
			className,
			children,
			...props
		} = this.props;

		return (
			<li
				{...props}
				className={style(classes.itemSeparator, className)}
			>
				{children}
			</li>
		);
	}
}

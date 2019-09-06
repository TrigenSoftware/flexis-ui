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
} from './Menu.st.css';

export * from './MenuItem';
export * from './MenuItemSeparator';
export * from './MenuButton';

interface ISelfProps {
	children: ReactNode;
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	HTMLAttributes<HTMLUListElement>
>;

export default class Menu extends PureComponent<IProps> {

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
			<ul
				role='menu'
				{...props}
				className={style(classes.root, className)}
			>
				{children}
			</ul>
		);
	}
}

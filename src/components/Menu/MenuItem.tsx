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
			className,
			children,
			...props
		} = this.props;

		return (
			<li
				role='menuitem'
				{...props}
				className={style(classes.item, className)}
			>
				{children}
			</li>
		);
	}
}

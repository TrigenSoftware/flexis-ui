import React, {
	AllHTMLAttributes,
	ReactNode,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import { getHtmlProps } from '../../helpers';
import stylesheet from './Menu.st.css';

export * from './MenuItem';
export * from './MenuItemSeparator';
export * from './MenuButton';

interface ISelfProps {
	children: ReactNode;
}

export type IProps = ISelfProps & AllHTMLAttributes<HTMLUListElement>;

export default class Menu extends PureComponent<IProps> {

	static propTypes = {
		children: PropTypes.node.isRequired
	};

	render() {

		const {
			children,
			...props
		} = this.props;

		return (
			<ul
				role='menu'
				{...getHtmlProps(props)}
				{...stylesheet('root', {}, props)}
			>
				{children}
			</ul>
		);
	}
}

import React, {
	AllHTMLAttributes,
	ReactNode,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import { getHtmlProps } from '../../helpers';
import stylesheet from './Menu.st.css';

interface ISelfProps {
	children?: ReactNode;
}

export type IMenuItemSeparatorProps = ISelfProps & AllHTMLAttributes<HTMLLIElement>;

export class MenuItemSeparator extends PureComponent<IMenuItemSeparatorProps> {

	static propTypes = {
		children: PropTypes.node
	};

	static defaultProps = {
		children: null
	};

	render() {

		const {
			children,
			...props
		} = this.props;

		return (
			<li
				{...getHtmlProps(props)}
				{...stylesheet('itemSeparator', {}, props)}
			>
				{children}
			</li>
		);
	}
}

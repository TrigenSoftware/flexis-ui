import React, {
	AllHTMLAttributes,
	ReactNode,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import { getHtmlProps } from '../../helpers';
import stylesheet from './Menu.st.css';

interface ISelfProps {
	children: ReactNode;
}

export type IMenuItemProps = ISelfProps & AllHTMLAttributes<HTMLLIElement>;

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
				{...getHtmlProps(props)}
				{...stylesheet('item', {}, props)}
			>
				{children}
			</li>
		);
	}
}

import React, {
	AllHTMLAttributes,
	ReactElement,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import { getHtmlProps } from '../../helpers';
import stylesheet from './Menu.st.css';

export * from './MenuItem';
export * from './MenuItemSeparator';
export * from './MenuButton';

interface ISelfProps {
	children: ReactElement<any>|ReactElement<any>[];
}

export type IProps = ISelfProps & AllHTMLAttributes<HTMLUListElement>;

export default class Menu extends PureComponent<IProps> {

	static propTypes = {
		children: PropTypes.oneOf(
			PropTypes.element,
			PropTypes.arrayOf(PropTypes.element)
		).isRequired
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

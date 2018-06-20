import React, {
	AllHTMLAttributes,
	ReactElement,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import { getHtmlProps } from '../../helpers';
import stylesheet from './Table.st.css';

export * from './TableHead';
export * from './TableBody';
export * from './TableRow';
export * from './TableCell';

interface ISelfProps {
	children: ReactElement<any>|ReactElement<any>[];
}

export type IProps = ISelfProps & AllHTMLAttributes<HTMLTableElement>;

export default class Table extends PureComponent<IProps> {

	static propTypes = {
		children: PropTypes.oneOf([
			PropTypes.element,
			PropTypes.arrayOf(PropTypes.element)
		]).isRequired
	};

	render() {

		const {
			children,
			...props
		} = this.props;

		return (
			<table
				{...getHtmlProps(props)}
				{...stylesheet('root', {}, props)}
			>
				{children}
			</table>
		);
	}
}

import React, {
	AllHTMLAttributes,
	ReactElement,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes,
	getHtmlProps
} from '../../helpers';
import stylesheet from './Table.st.css';

export * from './TableHead';
export * from './TableBody';
export * from './TableFoot';
export * from './TableRow';
export * from './TableCell';

interface ISelfProps {
	children: ReactElement<any>|ReactElement<any>[];
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	AllHTMLAttributes<HTMLTableElement>
>;

export default class Table extends PureComponent<IProps> {

	static propTypes = {
		children: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.arrayOf(PropTypes.oneOfType([
				PropTypes.element,
				PropTypes.arrayOf(PropTypes.element)
			]))
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

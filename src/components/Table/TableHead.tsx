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

interface ISelfProps {
	children: ReactElement<any>|ReactElement<any>[];
}

export type ITableHeadProps = CombinePropsAndAttributes<
	ISelfProps,
	AllHTMLAttributes<HTMLTableSectionElement>
>;

export class TableHead extends PureComponent<ITableHeadProps> {

	static propTypes = {
		children: PropTypes.oneOfType([
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
			<thead
				{...getHtmlProps(props)}
				{...stylesheet('head', {}, props)}
			>
				{children}
			</thead>
		);
	}
}

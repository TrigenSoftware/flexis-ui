import React, {
	HTMLAttributes,
	ReactElement,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes
} from '../../helpers';
import stylesheet from './Table.st.css';

interface ISelfProps {
	children: ReactElement<any>|ReactElement<any>[];
}

export type ITableHeadProps = CombinePropsAndAttributes<
	ISelfProps,
	HTMLAttributes<HTMLTableSectionElement>
>;

export class TableHead extends PureComponent<ITableHeadProps> {

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
			<thead
				{...props}
				{...stylesheet('head', {}, props)}
			>
				{children}
			</thead>
		);
	}
}

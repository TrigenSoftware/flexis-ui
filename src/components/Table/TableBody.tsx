import React, {
	AllHTMLAttributes,
	ReactElement,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import { getHtmlProps } from '../../helpers';
import stylesheet from './Table.st.css';

interface ISelfProps {
	children: ReactElement<any>|ReactElement<any>[];
}

export type IProps = ISelfProps & AllHTMLAttributes<HTMLTableSectionElement>;

export class TableBody extends PureComponent<IProps> {

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
			<tbody
				{...getHtmlProps(props)}
				{...stylesheet('body', {}, props)}
			>
				{children}
			</tbody>
		);
	}
}

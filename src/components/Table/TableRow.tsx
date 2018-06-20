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

export type IProps = ISelfProps & AllHTMLAttributes<HTMLTableRowElement>;

export class TableRow extends PureComponent<IProps> {

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
			<tr
				{...getHtmlProps(props)}
				{...stylesheet('row', {}, props)}
			>
				{children}
			</tr>
		);
	}
}

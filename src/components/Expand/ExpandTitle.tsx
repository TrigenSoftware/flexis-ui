import React, {
	AllHTMLAttributes,
	ReactNode,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import { getHtmlProps } from '../../helpers';
import stylesheet from './Expand.st.css';

interface ISelfProps {
	tabIndex?: number|string;
	disabled?: boolean;
	children?: ReactNode;
}

export type IExpandTitleProps = ISelfProps & AllHTMLAttributes<HTMLDivElement>;

export class ExpandTitle extends PureComponent<IExpandTitleProps> {

	static propTypes = {
		tabIndex: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string
		]),
		disabled: PropTypes.bool,
		children: PropTypes.node
	};

	static defaultProps = {
		tabIndex: 0,
		disabled: false,
		children: null
	};

	render() {

		const {
			tabIndex,
			disabled,
			children,
			...props
		} = this.props;

		return (
			<div
				{...getHtmlProps(props)}
				{...stylesheet('title', {}, props)}
				tabIndex={disabled ? -1 : tabIndex}
			>
				{children}
			</div>
		);
	}
}

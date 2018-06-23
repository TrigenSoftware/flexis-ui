import React, {
	AllHTMLAttributes,
	ReactNode,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes,
	getHtmlProps
} from '../../helpers';
import stylesheet from './Expand.st.css';

interface ISelfProps {
	tabIndex?: number;
	disabled?: boolean;
	children?: ReactNode;
}

export type IExpandTitleProps = CombinePropsAndAttributes<
	ISelfProps,
	AllHTMLAttributes<HTMLDivElement>
>;

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

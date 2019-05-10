import React, {
	HTMLAttributes,
	ReactNode,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes
} from '../../helpers';
import stylesheet from './Expand.st.css';

interface ISelfProps {
	tabIndex?: number;
	disabled?: boolean;
	children?: ReactNode;
}

export type IExpandTitleProps = CombinePropsAndAttributes<
	ISelfProps,
	HTMLAttributes<HTMLDivElement>
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
				{...props}
				{...stylesheet('title', {}, props)}
				tabIndex={disabled ? -1 : tabIndex}
			>
				{children}
			</div>
		);
	}
}

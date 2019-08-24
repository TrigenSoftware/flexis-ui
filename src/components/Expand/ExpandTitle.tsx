import React, {
	HTMLAttributes,
	ReactNode,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes
} from '../../helpers';
import {
	style,
	classes
} from './Expand.st.css';

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
		tabIndex: PropTypes.number,
		disabled: PropTypes.bool,
		children: PropTypes.node
	};

	static defaultProps = {
		tabIndex: 0,
		disabled: false
	};

	render() {

		const {
			className,
			tabIndex,
			disabled,
			children,
			...props
		} = this.props;

		return (
			<div
				{...props}
				className={style(classes.title, className)}
				tabIndex={disabled ? -1 : tabIndex}
			>
				{children}
			</div>
		);
	}
}

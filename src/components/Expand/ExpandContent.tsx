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
	children?: ReactNode;
}

export type IExpandContentProps = CombinePropsAndAttributes<
	ISelfProps,
	HTMLAttributes<HTMLDivElement>
>;

export class ExpandContent extends PureComponent<IExpandContentProps> {

	static propTypes = {
		children: PropTypes.node
	};

	render() {

		const {
			children,
			...props
		} = this.props;

		return (
			<div
				{...props}
				{...stylesheet('content', {}, props)}
			>
				{children}
			</div>
		);
	}
}

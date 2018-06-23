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
	children?: ReactNode;
}

export type IExpandContentProps = CombinePropsAndAttributes<
	ISelfProps,
	AllHTMLAttributes<HTMLDivElement>
>;

export class ExpandContent extends PureComponent<IExpandContentProps> {

	static propTypes = {
		children: PropTypes.node
	};

	static defaultProps = {
		children: null
	};

	render() {

		const {
			children,
			...props
		} = this.props;

		return (
			<div
				{...getHtmlProps(props)}
				{...stylesheet('content', {}, props)}
			>
				{children}
			</div>
		);
	}
}

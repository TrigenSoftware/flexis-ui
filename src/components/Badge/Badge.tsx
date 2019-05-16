import React, {
	HTMLAttributes,
	ReactNode,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes
} from '../../helpers';
import stylesheet from './Badge.st.css';

export {
	default as BadgeContainer
} from './BadgeContainer';

interface ISelfProps {
	children?: ReactNode;
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	HTMLAttributes<HTMLSpanElement>
>;

export default class Badge extends PureComponent<IProps> {

	static propTypes = {
		children: PropTypes.node
	};

	render() {

		const {
			children,
			...props
		} = this.props;

		return (
			<span
				{...props}
				{...stylesheet('root', {}, props)}
			>
				{children}
			</span>
		);
	}
}

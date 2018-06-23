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
import stylesheet from './Badge.st.css';

export {
	default as BadgeContainer
} from './BadgeContainer';

interface ISelfProps {
	children?: ReactNode;
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	AllHTMLAttributes<HTMLLabelElement>
>;

export default class Badge extends PureComponent<IProps> {

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
			<label
				{...getHtmlProps(props)}
				{...stylesheet('root', {}, props)}
			>
				{children}
			</label>
		);
	}
}

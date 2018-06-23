import React, {
	AllHTMLAttributes,
	ReactNode,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes,
	getHtmlProps
} from '../../../helpers';
import stylesheet from './BadgeContainer.st.css';

interface ISelfProps {
	placement: 'top'|'right'|'bottom'|'left';
	align?: 'start'|'center'|'end';
	children: ReactNode;
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	AllHTMLAttributes<HTMLSpanElement>
>;

export default class BadgeContainer extends PureComponent<IProps> {

	static propTypes = {
		placement: PropTypes.oneOf([
			'top',
			'right',
			'bottom',
			'left'
		]).isRequired,
		align:     PropTypes.oneOf([
			'start',
			'center',
			'end'
		]),
		children:  PropTypes.node.isRequired
	};

	static defaultProps = {
		align: 'center'
	};

	render() {

		const {
			placement,
			align,
			children,
			...props
		} = this.props;

		return (
			<span
				{...getHtmlProps(props)}
				{...stylesheet('root', {
					[`${placement}Placement`]: Boolean(placement),
					[`${align}Align`]:         Boolean(align)
				}, props)}
			>
				{children}
			</span>
		);
	}
}

import React, {
	HTMLAttributes,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import { getHtmlProps } from '../../../helpers';
import stylesheet from './BadgeContainer.st.css';

interface IProps extends HTMLAttributes<HTMLSpanElement> {
	placement: string;
	align?: string;
}

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

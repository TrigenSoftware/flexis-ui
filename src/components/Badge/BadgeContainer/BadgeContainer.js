import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	Stylable,
	getHtmlProps
} from '../../helpers';
import stylesheet from './BadgeContainer.st.css';

@Stylable(stylesheet)
export default class BadgeContainer extends PureComponent {

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
		children:  PropTypes.any.isRequired
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
				style-state={{
					[`${placement}Placement`]: placement,
					[`${align}Align`]:         align
				}}
			>
				{children}
			</span>
		);
	}
}

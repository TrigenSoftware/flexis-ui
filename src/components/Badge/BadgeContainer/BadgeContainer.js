import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	stylable,
	getHtmlProps
} from '../../helpers';
import stylesheet from './BadgeContainer.st.css';

@stylable(stylesheet)
export default class BadgeContainer extends PureComponent {

	static propTypes = {
		children:  PropTypes.any.isRequired,
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
		])
	};

	static defaultProps = {
		align: 'center'
	};

	render() {

		const {
			children,
			placement,
			align,
			...props
		} = this.props;

		return (
			<span
				style-state={{
					[`${placement}Placement`]: placement,
					[`${align}Align`]:         align
				}}
				{...getHtmlProps(props)}
			>
				{children}
			</span>
		);
	}
}

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	Listener,
	getHtmlProps
} from '../../helpers';

export class DropdownContent extends PureComponent {

	static propTypes = {
		children: PropTypes.any.isRequired
	}

	render() {

		const {
			children,
			...props
		} = this.props;

		return (
			<div
				{...getHtmlProps(props)}
				onClick={this.onClick()}
			>
				{children}
			</div>
		);
	}

	@Listener()
	onClick(event) {
		event.stopPropagation();
		event.nativeEvent.stopImmediatePropagation();
	}
}

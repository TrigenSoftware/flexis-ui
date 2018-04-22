import React, { PureComponent } from 'react';
import {
	Listener,
	getHtmlProps
} from '../../helpers';

export class DropdownContent extends PureComponent {

	render() {

		const {
			props
		} = this;

		return (
			<div
				{...getHtmlProps(props)}
				onClick={this.onClick()}
			/>
		);
	}

	@Listener()
	onClick(event) {
		event.stopPropagation();
		event.nativeEvent.stopImmediatePropagation();
	}
}

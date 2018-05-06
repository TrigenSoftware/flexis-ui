import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	Listener,
	getHtmlProps
} from '../../helpers';

export class DropdownContent extends PureComponent {

	static propTypes = {
		elementRef: PropTypes.func,
		children:   PropTypes.node.isRequired
	};

	static defaultProps = {
		elementRef: null
	};

	render() {

		const {
			elementRef,
			children,
			...props
		} = this.props;

		return (
			<div
				tabIndex={0}
				{...getHtmlProps(props)}
				ref={elementRef}
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

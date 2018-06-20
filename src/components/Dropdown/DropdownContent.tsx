import React, {
	AllHTMLAttributes,
	Ref,
	ReactNode,
	MouseEvent,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	Listener,
	getHtmlProps
} from '../../helpers';

interface ISelfProps {
	elementRef?: Ref<HTMLDivElement>;
	children: ReactNode;
}

export type IDropdownContentProps = ISelfProps & AllHTMLAttributes<HTMLDivElement>;

export class DropdownContent extends PureComponent<IDropdownContentProps> {

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
				onClick={this.onClick}
			>
				{children}
			</div>
		);
	}

	@Listener()
	onClick(event: MouseEvent<HTMLDivElement>) {
		event.stopPropagation();
		event.nativeEvent.stopImmediatePropagation();
	}
}

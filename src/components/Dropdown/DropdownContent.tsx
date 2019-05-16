import React, {
	HTMLAttributes,
	Ref,
	ReactNode,
	MouseEvent,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes
} from '../../helpers';

interface ISelfProps {
	elementRef?: Ref<HTMLDivElement>;
	children: ReactNode;
}

export type IDropdownContentProps = CombinePropsAndAttributes<
	ISelfProps,
	HTMLAttributes<HTMLDivElement>
>;

export class DropdownContent extends PureComponent<IDropdownContentProps> {

	static propTypes = {
		elementRef: PropTypes.func,
		children:   PropTypes.node.isRequired
	};

	render() {

		const {
			elementRef,
			children,
			...props
		} = this.props;

		return (
			<div
				ref={elementRef}
				tabIndex={0}
				{...props}
				onClick={this.onClick}
			>
				{children}
			</div>
		);
	}

	private onClick(event: MouseEvent<HTMLDivElement>) {
		event.stopPropagation();
		event.nativeEvent.stopImmediatePropagation();
	}
}

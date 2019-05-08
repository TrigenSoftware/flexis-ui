import React, {
	AllHTMLAttributes,
	Ref,
	ReactNode,
	MouseEvent,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes,
	Bind,
	getHtmlProps
} from '../../helpers';

interface ISelfProps {
	elementRef?: Ref<HTMLDivElement>;
	children: ReactNode;
}

export type IDropdownContentProps = CombinePropsAndAttributes<
	ISelfProps,
	AllHTMLAttributes<HTMLDivElement>
>;

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
				ref={elementRef}
				tabIndex={0}
				{...getHtmlProps(props)}
				onClick={this.onClick}
			>
				{children}
			</div>
		);
	}

	@Bind()
	private onClick(event: MouseEvent<HTMLDivElement>) {
		event.stopPropagation();
		event.nativeEvent.stopImmediatePropagation();
	}
}

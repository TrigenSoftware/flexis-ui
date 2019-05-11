import React, {
	HTMLAttributes,
	DragEvent,
	ReactNode,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes,
	Bind,
	omit
} from '../../helpers';
import stylesheet from './FileDrop.st.css';

interface ISelfProps {
	disabled?: boolean;
	children?: ReactNode;
	onChange?(files: File[], event: DragEvent);
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	HTMLAttributes<HTMLDivElement>
>;

interface IState {
	dragOver: boolean;
}

export default class FileSelect extends PureComponent<IProps, IState> {

	static propTypes = {
		onChange: PropTypes.func,
		disabled: PropTypes.bool,
		children: PropTypes.node
	};

	static defaultProps = {
		onChange: null,
		disabled: false,
		children: null
	};

	state = {
		dragOver: false
	};

	render() {

		const {
			disabled,
			children,
			...props
		} = this.props;
		const {
			dragOver
		} = this.state;

		return (
			<div
				{...omit(props, ['onChange'])}
				{...stylesheet('root', {
					disabled,
					dragOver
				}, props)}
				onDrag={this.onIgnoredEvent}
				onDragStart={this.onIgnoredEvent}
				onDragOver={this.onDragOver}
				onDragEnter={this.onDragOver}
				onDragLeave={this.onDragLeave}
				onDragEnd={this.onDragLeave}
				onDrop={this.onChange}
				aria-disabled={disabled}
			>
				{children}
			</div>
		);
	}

	private onIgnoredEvent(event: DragEvent) {
		event.stopPropagation();
		event.preventDefault();
	}

	@Bind()
	private onDragOver(event: DragEvent) {

		event.stopPropagation();
		event.preventDefault();

		this.setState(() => ({
			dragOver: true
		}));
	}

	@Bind()
	private onDragLeave(event: DragEvent) {

		event.stopPropagation();
		event.preventDefault();

		this.setState(() => ({
			dragOver: false
		}));
	}

	@Bind()
	private onChange(event: DragEvent) {

		event.stopPropagation();
		event.preventDefault();

		const {
			disabled
		} = this.props;

		if (disabled) {
			return;
		}

		this.setState(() => ({
			dragOver: false
		}));

		const {
			onChange
		} = this.props;

		if (typeof onChange === 'function') {
			onChange(
				Array.from(event.dataTransfer.files),
				event
			);
		}
	}
}

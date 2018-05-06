import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	Listener,
	getHtmlProps
} from '../../helpers';
import stylesheet from './FileDrop.st.css';

export default class FileSelect extends PureComponent {

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
				{...getHtmlProps(props, ['onChange'])}
				{...stylesheet('root', {
					disabled,
					dragOver
				}, props)}
				onDrag={this.onIgnoredEvent()}
				onDragStart={this.onIgnoredEvent()}
				onDragOver={this.onDragOver()}
				onDragEnter={this.onDragOver()}
				onDragLeave={this.onDragLeave()}
				onDragEnd={this.onDragLeave()}
				onDrop={this.onChange()}
			>
				{children}
			</div>
		);
	}

	@Listener()
	onIgnoredEvent(event) {
		event.stopPropagation();
		event.preventDefault();
	}

	@Listener()
	onDragOver(event) {

		event.stopPropagation();
		event.preventDefault();

		this.setState(() => ({
			dragOver: true
		}));
	}

	@Listener()
	onDragLeave(event) {

		event.stopPropagation();
		event.preventDefault();

		this.setState(() => ({
			dragOver: false
		}));
	}

	@Listener()
	onChange(event) {

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

		if (typeof onChange == 'function') {
			onChange(
				Array.from(event.dataTransfer.files),
				event
			);
		}
	}
}

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	Stylable,
	Listener,
	getHtmlProps
} from '../../helpers';
import stylesheet from './FileDrop.st.css';

@Stylable(stylesheet)
export default class FileSelect extends PureComponent {

	static propTypes = {
		onChange: PropTypes.func,
		children: PropTypes.any
	};

	static defaultProps = {
		onChange: null,
		children: null
	};

	state = {
		dragOver: false
	};

	render() {

		const {
			children,
			...props
		} = this.props;

		const {
			dragOver
		} = this.state;

		return (
			<div
				{...getHtmlProps(props, ['onChange'])}
				style-state={{
					dragOver
				}}
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

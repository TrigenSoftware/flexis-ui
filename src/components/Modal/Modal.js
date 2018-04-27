import React, {
	PureComponent,
	cloneElement
} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import {
	Listener,
	blockScroll,
	getHtmlProps
} from '../../helpers';
import stylesheet from './Modal.st.css';

const defaultCloseButton = (
	<button type='button'>
		&times;
	</button>
);

export default class Modal extends PureComponent {

	static propTypes = {
		onClose:     PropTypes.func,
		active:      PropTypes.bool,
		centered:    PropTypes.bool,
		closeButton: PropTypes.element,
		children:    PropTypes.any.isRequired
	};

	static defaultProps = {
		onClose:     null,
		active:      false,
		centered:    false,
		closeButton: defaultCloseButton
	};

	unblockScroll = null;

	render() {

		const {
			onClose,
			active,
			centered,
			closeButton,
			children,
			...props
		} = this.props;

		return !active ? null : createPortal((
			<div
				{...stylesheet('root')}
				onClick={onClose}
			>
				<div
					{...getHtmlProps(props)}
					{...stylesheet('window', {
						centered
					}, props)}
					onClick={this.onIgnoredEvent()}
				>
					{closeButton && cloneElement(
						closeButton,
						{
							...stylesheet('closeButton', {}, closeButton.props),
							onClick: onClose
						}
					)}
					{children}
				</div>
			</div>
		), document.body);
	}

	componentDidMount() {
		this.toggleScrollBlock();
	}

	componentWillUnmount() {

		if (typeof this.unblockScroll == 'function') {
			this.unblockScroll();
			this.unblockScroll = null;
		}
	}

	componentDidUpdate({ active: prevActive }) {

		const {
			active
		} = this.props;

		if (prevActive != active) {
			this.toggleScrollBlock();
		}
	}

	@Listener()
	onIgnoredEvent(event) {
		event.stopPropagation();
	}

	toggleScrollBlock() {

		const {
			active
		} = this.props;

		const scrollBlocked = typeof this.unblockScroll == 'function';

		if (active) {

			if (scrollBlocked) {
				this.unblockScroll();
			}

			this.unblockScroll = blockScroll(document.body);

		} else
		if (scrollBlocked) {
			this.unblockScroll();
			this.unblockScroll = null;
		}
	}
}

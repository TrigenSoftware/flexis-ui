import React, {
	AllHTMLAttributes,
	MouseEvent,
	SyntheticEvent,
	ReactElement,
	ReactNode,
	PureComponent,
	cloneElement
} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import {
	Listener,
	subscribeEvent,
	getHtmlProps
} from '../../helpers';
import toggleScrollBlock from '../common/toggleScrollBlock';
import toggleAriaHide from '../common/toggleAriaHide';
import StylableTransition from '../StylableTransition';
import stylesheet from './Modal.st.css';

interface ISelfProps {
	active?: boolean;
	centered?: boolean;
	closeButton?: ReactElement<any>;
	transitionDuration?: number;
	children: ReactNode;
	onClose?(event: SyntheticEvent|KeyboardEvent);
}

export type IProps = ISelfProps & AllHTMLAttributes<HTMLDivElement>;

const ESC_KEY = 27;

const defaultCloseButton = (
	<button type='button'>
		&times;
	</button>
);

let appElement = null;

export function setAppElement(appElementSource) {
	appElement = typeof appElementSource === 'string'
		? document.querySelector(appElementSource)
		: appElementSource;
}

export default class Modal extends PureComponent<IProps> {

	static propTypes = {
		onClose:            PropTypes.func,
		active:             PropTypes.bool,
		centered:           PropTypes.bool,
		closeButton:        PropTypes.element,
		children:           PropTypes.node.isRequired,
		transitionDuration: PropTypes.number
	};

	static defaultProps = {
		onClose:            null,
		active:             false,
		centered:           false,
		closeButton:        defaultCloseButton,
		transitionDuration: 400
	};

	private unblockScroll: () => void = null;
	private unsubscribeKeyDown: () => void = null;
	private ariaShow: () => void = null;

	render() {

		const {
			onClose,
			active,
			centered,
			closeButton,
			children,
			transitionDuration,
			...props
		} = this.props;

		return createPortal((
			<StylableTransition
				in={active}
				states={stylesheet}
				timeout={transitionDuration}
				appear
				unmountOnExit
			>
				<div
					{...stylesheet('root')}
					onClick={onClose}
				>
					<div
						role='dialog'
						aria-modal
						{...getHtmlProps(props)}
						{...stylesheet('window', {
							centered
						}, props)}
						onClick={this.onIgnoredEvent}
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
			</StylableTransition>
		), document.body);
	}

	componentDidMount() {
		this.toggleEffects();
	}

	componentWillUnmount() {
		this.removeEffects();
	}

	componentDidUpdate({ active: prevActive }: IProps) {

		const {
			active
		} = this.props;

		if (prevActive !== active) {
			this.toggleEffects();
		}
	}

	@Listener()
	private onIgnoredEvent(event: MouseEvent<HTMLDivElement>) {
		event.stopPropagation();
	}

	@Listener()
	private onEscPress(event: KeyboardEvent) {

		const {
			onClose
		} = this.props;

		if (event.keyCode === ESC_KEY
			&& typeof onClose === 'function'
		) {
			event.stopPropagation();
			onClose(event);
		}
	}

	private toggleEffects() {

		const {
			active
		} = this.props;

		this.unblockScroll = toggleScrollBlock(
			active,
			this.unblockScroll
		);

		if (appElement) {
			this.ariaShow = toggleAriaHide(
				active,
				this.ariaShow,
				appElement
			);
		}

		const keyDownSubscribed = typeof this.unsubscribeKeyDown === 'function';

		if (active) {

			if (!keyDownSubscribed) {
				this.unsubscribeKeyDown = subscribeEvent(
					document,
					'keydown',
					this.onEscPress
				);
			}
		} else
		if (keyDownSubscribed) {
			this.unsubscribeKeyDown();
			this.unsubscribeKeyDown = null;
		}
	}

	private removeEffects() {

		if (typeof this.unblockScroll === 'function') {
			this.unblockScroll();
			this.unblockScroll = null;
		}

		if (typeof this.ariaShow === 'function') {
			this.ariaShow();
			this.ariaShow = null;
		}

		if (typeof this.unsubscribeKeyDown === 'function') {
			this.unsubscribeKeyDown();
			this.unsubscribeKeyDown = null;
		}
	}
}

import React, {
	HTMLAttributes,
	MouseEvent,
	SyntheticEvent,
	ReactElement,
	ReactNode,
	PureComponent,
	cloneElement
} from 'react';
import {
	createPortal
} from 'react-dom';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes,
	Bind,
	subscribeEvent
} from '../../helpers';
import toggleScrollBlock from '../common/toggleScrollBlock';
import toggleAriaHide from '../common/toggleAriaHide';
import StylableTransition from '../StylableTransition';
import {
	style,
	classes,
	cssStates
} from './Modal.st.css';

interface ISelfProps {
	active?: boolean;
	centered?: boolean;
	closeButton?: ReactElement<any>;
	transitionDuration?: number;
	children: ReactNode;
	wrapContent?(content: ReactElement<any>): ReactNode;
	onClose?(event: SyntheticEvent|KeyboardEvent);
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	HTMLAttributes<HTMLDivElement>
>;

const ESC_KEY = 27;

const defaultCloseButton = (
	<button type='button'>
		&times;
	</button>
);

let appElement = null;

export function setAppElement(appElementSource) {
	appElement = typeof appElementSource === 'string'
		? (typeof document === 'undefined'
			? null
			: document.querySelector(appElementSource))
		: appElementSource;
}

export default class Modal extends PureComponent<IProps> {

	static propTypes = {
		onClose:            PropTypes.func,
		active:             PropTypes.bool,
		centered:           PropTypes.bool,
		closeButton:        PropTypes.element,
		children:           PropTypes.node.isRequired,
		transitionDuration: PropTypes.number,
		wrapContent:        PropTypes.func
	};

	static defaultProps = {
		active:             false,
		centered:           false,
		closeButton:        defaultCloseButton,
		transitionDuration: 0
	};

	private unblockScroll: () => void = null;
	private unsubscribeKeyDown: () => void = null;
	private ariaShow: () => void = null;

	render() {

		const {
			className,
			onClose,
			active,
			centered,
			closeButton,
			children,
			transitionDuration,
			...props
		} = this.props;

		Reflect.deleteProperty(props, 'wrapContent');

		return createPortal((
			<StylableTransition
				in={active}
				states={cssStates}
				timeout={transitionDuration}
				appear
				unmountOnExit
			>
				<div
					className={style(classes.root, className)}
					onClick={onClose}
				>
					<div
						role='dialog'
						aria-modal
						{...props}
						className={style(classes.window, {
							centered
						})}
						onClick={this.onIgnoredEvent}
					>
						{this.wrapContent(
							<>
								{closeButton && cloneElement(
									closeButton,
									{
										className: style(classes.closeButton, closeButton.props.className),
										onClick:   onClose
									}
								)}
								{children}
							</>
						)}
					</div>
				</div>
			</StylableTransition>
		), document.body);
	}

	private wrapContent(content: ReactElement<any>) {

		const {
			wrapContent
		} = this.props;

		if (typeof wrapContent === 'function') {
			return wrapContent(content);
		}

		return content;
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

	private onIgnoredEvent(event: MouseEvent<HTMLDivElement>) {
		event.stopPropagation();
	}

	@Bind()
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

if (typeof document === 'undefined') {
	Modal.prototype.render = () => null;
}

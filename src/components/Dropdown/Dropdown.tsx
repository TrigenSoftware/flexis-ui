import React, {
	AllHTMLAttributes,
	MouseEvent,
	KeyboardEvent,
	SyntheticEvent,
	ReactElement,
	PureComponent,
	Children,
	cloneElement
} from 'react';
import {
	createPortal
} from 'react-dom';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes,
	Listener,
	subscribeEvent,
	getAriaLabelProps,
	getHtmlProps
} from '../../helpers';
import getStylesheetState from '../common/getStylesheetState';
import setOverflowOffset from '../common/setOverflowOffset';
import toggleScrollBlock from '../common/toggleScrollBlock';
import toggleAttribute from '../common/toggleAttribute';
import StylableTransition from '../StylableTransition';
import stylesheet from './Dropdown.st.css';

export * from './DropdownContent';

interface ISelfProps {
	active?: boolean;
	defaultActive?: boolean;
	disabled?: boolean;
	blockScroll?: boolean;
	align?: 'left'|'center'|'right';
	children: ReactElement<any>[];
	transitionDuration?: number;
	onToggle?(active: boolean, event: Event|SyntheticEvent);
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	AllHTMLAttributes<HTMLSpanElement>
>;

interface IState {
	active: boolean;
}

const HALF = 2;
const ESC_KEY = 27;

const contentOffsetState = getStylesheetState(
	stylesheet('content', {
		offset: true
	})
);

export default class Dropdown extends PureComponent<IProps, IState> {

	static propTypes = {
		onToggle:           PropTypes.func,
		defaultActive:      PropTypes.bool,
		active:             PropTypes.bool,
		disabled:           PropTypes.bool,
		blockScroll:        PropTypes.bool,
		align:              PropTypes.oneOf([
			'left',
			'center',
			'right'
		]),
		children:           PropTypes.arrayOf(
			PropTypes.element
		).isRequired,
		transitionDuration: PropTypes.number
	};

	static defaultProps = {
		onToggle:           null,
		defaultActive:      false,
		active:             null,
		disabled:           false,
		blockScroll:        true,
		align:              'left',
		transitionDuration: 0
	};

	static getDerivedStateFromProps(
		{
			active,
			disabled
		}: IProps,
		{ active: prevActive }: IState
	): IState {

		const nextActive = !disabled && (typeof active === 'boolean'
			? active
			: prevActive
		);

		if (nextActive === prevActive) {
			return null;
		}

		return {
			active: nextActive
		};
	}

	private elementRef: HTMLSpanElement = null;
	private contentRef: HTMLElement = null;
	private unsubscribeFromOutsideClick: () => void = null;
	private unblockScroll: () => void = null;

	constructor(props) {

		super(props);

		const {
			defaultActive
		} = props;

		this.state = {
			active: defaultActive
		};
	}

	render() {

		const {
			disabled,
			children,
			...props
		} = this.props;
		const {
			active
		} = this.state;
		const [
			toggler,
			content,
			...misc
		] = Children.toArray<ReactElement<any>>(children);

		return (
			<span
				ref={this.onElementRef}
				{...getHtmlProps(props, ['align'])}
				{...stylesheet('root', {
					active,
					disabled
				}, props)}
				onClick={this.onToggle}
				aria-disabled={disabled}
			>
				{cloneElement(toggler, {
					'aria-haspopup': true,
					'aria-expanded': active,
					'aria-disabled': disabled,
					'disabled':      disabled
				})}
				{createPortal(
					this.renderContent(toggler, content),
					document.body
				)}
				{misc}
			</span>
		);
	}

	private renderContent(toggler: ReactElement<any>, content: ReactElement<any>) {

		const {
			align,
			transitionDuration
		} = this.props;
		const {
			active
		} = this.state;

		return (
			<StylableTransition
				in={active}
				states={stylesheet}
				statesElement='content'
				timeout={transitionDuration}
			>
				{cloneElement(content, {
					...getAriaLabelProps({
						role:       'region',
						labelledBy: toggler.props.id
					}, content.props),
					...stylesheet('content', {
						[`${align}Align`]: Boolean(align)
					}, content.props),
					'elementRef':   this.onContentRef,
					'onKeyDown':    this.onEscPress,
					'aria-hidden':  !active
				})}
			</StylableTransition>
		);
	}

	componentDidMount() {
		this.unsubscribeFromOutsideClick = subscribeEvent(
			document,
			'click',
			(event) => {

				const {
					active
				} = this.state;

				if (active) {
					this.toggleActiveState(false, event);
				}
			}
		);
		this.toggleEffects();
	}

	componentWillUnmount() {
		this.unsubscribeFromOutsideClick();
		this.removeEffects();
	}

	componentDidUpdate(_, { active: prevActive }: IState) {

		const {
			active
		} = this.state;

		if (prevActive !== active) {
			this.toggleEffects();
		}
	}

	@Listener()
	private onElementRef(ref: HTMLSpanElement) {
		this.elementRef = ref;
	}

	@Listener()
	private onContentRef(ref: HTMLElement) {
		this.contentRef = ref;
	}

	@Listener()
	private onToggle(event: MouseEvent<HTMLSpanElement>) {
		event.stopPropagation();
		event.nativeEvent.stopImmediatePropagation();
		this.toggleActiveState(null, event);
	}

	@Listener()
	private onEscPress(event: KeyboardEvent) {

		if (event.keyCode === ESC_KEY) {
			event.stopPropagation();
			this.toggleActiveState(false, event);
		}
	}

	toggleActiveState(forceState?: boolean, event: Event|SyntheticEvent = null) {

		const {
			active: activeProp,
			onToggle,
			disabled
		} = this.props;

		if (disabled) {
			return;
		}

		const {
			active
		} = this.state;
		const nextActive = typeof forceState === 'boolean'
			? forceState
			: !active;

		if (nextActive === active) {
			return;
		}

		if (typeof activeProp !== 'boolean') {
			this.setState(() => ({
				active: nextActive
			}));
		}

		if (typeof onToggle === 'function') {
			onToggle(nextActive, event);
		}
	}

	private toggleEffects() {

		const {
			elementRef,
			contentRef
		} = this;
		const {
			blockScroll
		} = this.props;
		const {
			active
		} = this.state;

		if (active) {
			contentRef.focus();
			this.setContentPosition();
		} else {
			(elementRef.firstElementChild as HTMLElement).focus();
		}

		if (blockScroll) {
			this.unblockScroll = toggleScrollBlock(
				active,
				this.unblockScroll,
				elementRef
			);
		}
	}

	private removeEffects() {

		if (typeof this.unblockScroll === 'function') {
			this.unblockScroll();
			this.unblockScroll = null;
		}
	}

	private setContentPosition() {

		const {
			elementRef,
			contentRef
		} = this;

		if (!elementRef || !contentRef) {
			return;
		}

		const {
			align
		} = this.props;
		const {
			top: elementTop,
			left: elementLeft,
			width: elementWidth,
			height: elementHeight
		} = elementRef.getBoundingClientRect();
		const {
			offsetWidth: contentWidth,
			style
		} = contentRef;
		let top = 0;
		let left = 0;

		top = elementTop + elementHeight;

		switch (align) {

			case 'left':
				left = elementLeft;
				break;

			case 'center':
				left = elementLeft + elementWidth / HALF;
				break;

			case 'right':
				left = elementLeft + elementWidth - contentWidth;
				break;

			default:
		}

		style.minWidth = `${elementWidth}px`;
		style.top = `${top}px`;
		style.left = `${left}px`;

		const withOffset = setOverflowOffset(contentRef, top, left);

		toggleAttribute(withOffset, contentOffsetState, contentRef);
	}
}

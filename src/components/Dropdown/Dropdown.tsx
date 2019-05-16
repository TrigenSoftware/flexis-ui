import React, {
	HTMLAttributes,
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
	Bind,
	subscribeEvent,
	getAriaLabelProps,
	omit
} from '../../helpers';
import {
	Align,
	AlignVariant,
	AlignValues
} from '../common/types';
import getStylesheetState from '../common/getStylesheetState';
import setOverflowOffset from '../common/setOverflowOffset';
import toggleScrollBlock from '../common/toggleScrollBlock';
import toggleAttribute from '../common/toggleAttribute';
import throttleFocus from '../common/throttleFocus';
import StylableTransition from '../StylableTransition';
import stylesheet from './Dropdown.st.css';

export * from './DropdownContent';

interface ISelfProps {
	active?: boolean;
	defaultActive?: boolean;
	disabled?: boolean;
	blockScroll?: boolean;
	align?: Align;
	children: ReactElement<any>[];
	transitionDuration?: number;
	onToggle?(active: boolean, event: Event|SyntheticEvent);
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	HTMLAttributes<HTMLSpanElement>
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
		align:              PropTypes.oneOf(AlignValues),
		children:           PropTypes.arrayOf(
			PropTypes.element
		).isRequired,
		transitionDuration: PropTypes.number
	};

	static defaultProps = {
		defaultActive:      false,
		disabled:           false,
		blockScroll:        true,
		align:              AlignVariant.Start,
		transitionDuration: 0
	};

	static getDerivedStateFromProps(
		{
			active,
			disabled
		}: IProps,
		{ active: prevActive }: IState
	): IState {

		const nextActive = !disabled && (
			typeof active === 'boolean'
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
				{...omit(props, [
					'defaultActive',
					'active',
					'blockScroll',
					'align',
					'transitionDuration'
				])}
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
				appear
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
		this.toggleEffects();
	}

	componentWillUnmount() {
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

	@Bind()
	private onElementRef(ref: HTMLSpanElement) {
		this.elementRef = ref;
	}

	@Bind()
	private onContentRef(ref: HTMLElement) {
		this.contentRef = ref;
	}

	@Bind()
	private onToggle(event: MouseEvent<HTMLSpanElement>) {
		this.toggleActiveState(null, event);
	}

	@Bind()
	private onEscPress(event: KeyboardEvent) {

		if (event.keyCode === ESC_KEY) {
			event.stopPropagation();
			this.toggleActiveState(false, event);
		}
	}

	@Bind()
	private onOutsideClick(event: Event) {

		const {
			active
		} = this.state;

		if (active) {
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
		const {
			parentElement
		} = elementRef;
		const outsideClickSubscribed = typeof this.unsubscribeFromOutsideClick === 'function';

		if (active) {

			this.setContentPosition();
			throttleFocus(contentRef);

			if (!outsideClickSubscribed) {
				this.unsubscribeFromOutsideClick = subscribeEvent(
					document,
					'click',
					this.onOutsideClick
				);
			}

		} else {

			throttleFocus(elementRef.firstElementChild as HTMLElement);

			if (outsideClickSubscribed) {
				this.unsubscribeFromOutsideClick();
				this.unsubscribeFromOutsideClick = null;
			}
		}

		if (blockScroll) {
			this.unblockScroll = toggleScrollBlock(
				active,
				this.unblockScroll,
				parentElement
			);
		}
	}

	private removeEffects() {

		if (typeof this.unblockScroll === 'function') {
			this.unblockScroll();
			this.unblockScroll = null;
		}

		if (typeof this.unsubscribeFromOutsideClick === 'function') {
			this.unsubscribeFromOutsideClick();
			this.unsubscribeFromOutsideClick = null;
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

			case AlignVariant.Start:
				left = elementLeft;
				break;

			case AlignVariant.Center:
				left = elementLeft + elementWidth / HALF;
				break;

			case AlignVariant.End:
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

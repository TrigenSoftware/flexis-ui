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
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import {
	Listener,
	subscribeEvent,
	getAriaLabelProps,
	getHtmlProps
} from '../../helpers';
import setOverflowOffset from '../common/setOverflowOffset';
import toggleScrollBlock from '../common/toggleScrollBlock';
import { IDropdownContentProps } from './DropdownContent';
import stylesheet from './Dropdown.st.css';

export * from './DropdownContent';

interface ISelfProps {
	active?: boolean;
	defaultActive?: boolean;
	disabled?: boolean;
	align?: 'left'|'center'|'right';
	children: ReactElement<any>[];
	onToggle?(active: boolean, event: Event|SyntheticEvent);
}

export type IProps = ISelfProps & AllHTMLAttributes<HTMLSpanElement>;

const HALF = 2;
const ESC_KEY = 27;

export default class Dropdown extends PureComponent<IProps> {

	static propTypes = {
		onToggle:      PropTypes.func,
		defaultActive: PropTypes.bool,
		active:        PropTypes.bool,
		disabled:      PropTypes.bool,
		align:         PropTypes.oneOf([
			'left',
			'center',
			'right'
		]),
		children:      PropTypes.arrayOf(
			PropTypes.element
		).isRequired
	};

	static defaultProps = {
		onToggle:      null,
		defaultActive: false,
		active:        null,
		disabled:      false,
		align:         'left'
	};

	static getDerivedStateFromProps(
		{
			active,
			disabled
		},
		{ active: prevActive }
	) {

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

	state: { active: boolean };
	elementRef = null;
	contentRef = null;
	unsubscribeFromOutsideClick = null;
	unblockScroll = null;

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
			align,
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
		] = Children.toArray(children) as ReactElement<any>[];

		return (
			<span
				{...getHtmlProps(props)}
				{...stylesheet('root', {
					active,
					disabled
				}, props)}
				ref={this.onElementRef}
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
					cloneElement(content, {
						...getAriaLabelProps({
							role:       'region',
							labelledBy: toggler.props.id
						}, content.props),
						...stylesheet('content', {
							[`${align}Align`]: Boolean(align),
							active
						}, content.props),
						'elementRef':   this.onContentRef,
						'onKeyDown':    this.onEscPress,
						'aria-hidden':  !active
					}),
					document.body
				)}
				{misc}
			</span>
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

	componentDidUpdate(_, { active: prevActive }) {

		const {
			active
		} = this.state;

		if (prevActive !== active) {
			this.toggleEffects();
		}
	}

	@Listener()
	onElementRef(ref) {
		this.elementRef = ref;
	}

	@Listener()
	onContentRef(ref) {
		this.contentRef = ref;
	}

	@Listener()
	onToggle(event: MouseEvent<HTMLSpanElement>) {
		event.stopPropagation();
		event.nativeEvent.stopImmediatePropagation();
		this.toggleActiveState(null, event);
	}

	@Listener()
	onEscPress(event: KeyboardEvent) {

		if (event.keyCode === ESC_KEY) {
			event.stopPropagation();
			this.toggleActiveState(false, event);
		}
	}

	toggleActiveState(forceState, event: Event|SyntheticEvent = null) {

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

	toggleEffects() {

		const {
			elementRef,
			contentRef
		} = this;

		const {
			active
		} = this.state;

		if (active) {
			contentRef.focus();
			this.setContentPosition();
		} else {
			elementRef.firstElementChild.focus();
		}

		this.unblockScroll = toggleScrollBlock(
			active,
			this.unblockScroll,
			elementRef
		);
	}

	removeEffects() {

		if (typeof this.unblockScroll === 'function') {
			this.unblockScroll();
			this.unblockScroll = null;
		}
	}

	setContentPosition() {

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
			offsetWidth: tooltipWidth,
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
				left = elementLeft + elementWidth - tooltipWidth;
				break;

			default:
		}

		style.top = `${top}px`;
		style.left = `${left}px`;

		setOverflowOffset(contentRef, top, left);
	}
}

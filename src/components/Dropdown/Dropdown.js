import React, {
	PureComponent,
	Children,
	cloneElement
} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import {
	Listener,
	subscribeEvent,
	getHtmlProps
} from '../../helpers';
import setOverflowOffset from '../common/setOverflowOffset';
import toggleScrollBlock from '../common/toggleScrollBlock';
import stylesheet from './Dropdown.st.css';

export * from './DropdownContent';

const half = 2;

export default class Dropdown extends PureComponent {

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

	static getDerivedStateFromProps({
		active,
		disabled
	}, { active: prevActive }) {

		const nextActive = !disabled && (typeof active == 'boolean'
			? active
			: prevActive
		);

		if (nextActive == prevActive) {
			return null;
		}

		return {
			active: nextActive
		};
	}

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
			content
		] = Children.toArray(children);

		return (
			<span
				{...getHtmlProps(props)}
				{...stylesheet('root', {
					active,
					disabled
				}, props)}
				ref={this.onElementRef()}
				onClick={this.onToggle()}
			>
				{toggler}
				{createPortal(
					cloneElement(
						content,
						{
							...stylesheet('content', {
								[`${align}Align`]: Boolean(align),
								active
							}, content.props),
							elementRef: this.onContentRef()
						}
					),
					document.body
				)}
			</span>
		);
	}

	componentDidMount() {
		this.unsubscribeFromOutsideClick = subscribeEvent(
			document,
			'click',
			(event) => {
				this.toggleActiveState(false, event);
			}
		);
		this.doDomUpdates();
	}

	componentWillUnmount() {

		this.unsubscribeFromOutsideClick();

		if (typeof this.unblockScroll == 'function') {
			this.unblockScroll();
			this.unblockScroll = null;
		}
	}

	componentDidUpdate(_, { active: prevActive }) {

		const {
			active
		} = this.state;

		if (prevActive != active) {
			this.doDomUpdates();
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
	onToggle(event) {
		event.stopPropagation();
		event.nativeEvent.stopImmediatePropagation();
		this.toggleActiveState(null, event);
	}

	toggleActiveState(forceState, event = null) {

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

		const nextActive = typeof forceState == 'boolean'
			? forceState
			: !active;

		if (nextActive === active) {
			return;
		}

		if (typeof activeProp != 'boolean') {
			this.setState(() => ({
				active: nextActive
			}));
		}

		if (typeof onToggle == 'function') {
			onToggle(nextActive, event);
		}
	}

	doDomUpdates() {

		const {
			active
		} = this.state;

		if (active) {
			this.setContentPosition();
		}

		this.unblockScroll = toggleScrollBlock(
			active,
			this.unblockScroll
		);
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
			top:    elementTop,
			left:   elementLeft,
			width:  elementWidth,
			height: elementHeight
		} = elementRef.getBoundingClientRect();

		const {
			offsetWidth: tooltipWidth,
			style
		} = contentRef;

		let top = 0,
			left = 0;

		top = elementTop + elementHeight;

		switch (align) {

			case 'left':
				left = elementLeft;
				break;

			case 'center':
				left = elementLeft + elementWidth / half;
				break;

			case 'end':
				left = elementLeft + elementWidth - tooltipWidth;
				break;

			default:
				break;
		}

		style.top = `${top}px`;
		style.left = `${left}px`;

		setOverflowOffset(contentRef, top, left);
	}
}

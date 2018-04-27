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
	blockScroll,
	getHtmlProps
} from '../../helpers';
import stylesheet from './Dropdown.st.css';

export * from './DropdownContent';

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
	boxRef = null;
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
				{createPortal((
					<div
						{...stylesheet('box', {
							active
						})}
						ref={this.onBoxRef()}
					>
						{cloneElement(
							content,
							stylesheet('content', {
								[`${align}Align`]: align
							}, content.props)
						)}
					</div>
				), document.body)}
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
	onBoxRef(ref) {
		this.boxRef = ref;
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

		const scrollBlocked = typeof this.unblockScroll == 'function';

		if (active) {

			if (scrollBlocked) {
				this.unblockScroll();
			}

			this.setBoxPosition();
			this.unblockScroll = blockScroll(this.elementRef);

		} else
		if (scrollBlocked) {
			this.unblockScroll();
			this.unblockScroll = null;
		}
	}

	setBoxPosition() {

		const {
			elementRef,
			boxRef
		} = this;

		if (!elementRef
			|| !boxRef
			|| !('getBoundingClientRect' in elementRef)
		) {
			return;
		}

		const {
			top,
			left,
			width,
			height
		} = elementRef.getBoundingClientRect();

		const {
			style
		} = boxRef;

		style.top = `${top}px`;
		style.left = `${left}px`;
		style.width = `${width}px`;
		style.height = `${height}px`;
	}
}

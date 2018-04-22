import React, {
	PureComponent,
	Children,
	cloneElement
} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import {
	Stylable,
	Listener,
	subscribeEvent,
	blockScroll,
	getHtmlProps
} from '../../helpers';
import stylesheet from './Dropdown.st.css';

export * from './DropdownContent';

@Stylable(stylesheet)
export default class Dropdown extends PureComponent {

	static propTypes = {
		onToggle: PropTypes.func,
		active:   PropTypes.bool,
		disabled: PropTypes.bool,
		align:    PropTypes.oneOf([
			'left',
			'center',
			'right'
		]),
		children: PropTypes.arrayOf(
			PropTypes.element
		).isRequired
	};

	static defaultProps = {
		onToggle: null,
		active:   null,
		disabled: false,
		align:    'left'
	};

	static getDerivedStateFromProps({ active }, { active: prevActive }) {

		if (active == prevActive) {
			return null;
		}

		return {
			active
		};
	}

	state = {
		active:    false,
		boxTop:    0,
		boxLeft:   0,
		boxWidth:  0,
		boxHeight: 0
	};

	elementRef = null;
	unsubscribeFromOutsideClick = null;
	unblockScroll = null;

	render() {

		const {
			disabled,
			align,
			children,
			...props
		} = this.props;

		const {
			active,
			boxTop,
			boxLeft,
			boxWidth,
			boxHeight
		} = this.state;

		const [
			toggler,
			content
		] = Children.toArray(children);

		return (
			<span
				{...getHtmlProps(props)}
				ref={this.onElementRef()}
				style-state={{
					active,
					disabled
				}}
				onClick={this.onToggle()}
			>
				{toggler}
				{createPortal((
					<div
						className='box'
						style={{
							top:    boxTop,
							left:   boxLeft,
							width:  boxWidth,
							height: boxHeight
						}}
						style-state={{
							active
						}}
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
	}

	componentWillUnmount() {

		this.unsubscribeFromOutsideClick();

		if (typeof this.unblockScroll == 'function') {
			this.unblockScroll();
			this.unblockScroll = null;
		}
	}

	@Listener()
	onElementRef(ref) {
		this.elementRef = ref;
	}

	@Listener()
	onToggle(event) {
		event.stopPropagation();
		event.nativeEvent.stopImmediatePropagation();
		this.toggleActiveState(null, event);
	}

	toggleActiveState(forceState, event = null) {

		const {
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

		const boxPosition = this.getBoxPosition(event && event.currentTarget);

		this.setState(() => ({
			active: nextActive,
			...boxPosition
		}), () => {

			if (nextActive) {
				this.unblockScroll = blockScroll(this.elementRef);
			} else
			if (typeof this.unblockScroll == 'function') {
				this.unblockScroll();
				this.unblockScroll = null;
			}
		});

		const {
			onToggle
		} = this.props;

		if (typeof onToggle == 'function') {
			onToggle(nextActive, event);
		}
	}

	getBoxPosition(element) {

		if (!element || !('getBoundingClientRect' in element)) {
			return {};
		}

		const {
			top,
			left,
			width,
			height
		} = element.getBoundingClientRect();

		return {
			boxTop:    top,
			boxLeft:   left,
			boxWidth:  width,
			boxHeight: height
		};
	}
}

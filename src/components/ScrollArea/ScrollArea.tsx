import React, {
	AllHTMLAttributes,
	UIEvent,
	WheelEvent,
	ReactNode,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	Listener,
	getHtmlProps
} from '../../helpers';
import stylesheet from './ScrollArea.st.css';

interface ISelfProps {
	ignoreTopShadow?: boolean;
	ignoreRightShadow?: boolean;
	ignoreBottomShadow?: boolean;
	ignoreLeftShadow?: boolean;
	hideXScrollbar?: boolean;
	hideYScrollbar?: boolean;
	y2xScroll?: boolean;
	children?: ReactNode;
}

export type IProps = ISelfProps & AllHTMLAttributes<HTMLDivElement>;

export default class ScrollArea extends PureComponent<IProps> {

	static propTypes = {
		ignoreTopShadow:    PropTypes.bool,
		ignoreRightShadow:  PropTypes.bool,
		ignoreBottomShadow: PropTypes.bool,
		ignoreLeftShadow:   PropTypes.bool,
		hideXScrollbar:     PropTypes.bool,
		hideYScrollbar:     PropTypes.bool,
		y2xScroll:          PropTypes.bool,
		children:           PropTypes.node
	};

	static defaultProps = {
		ignoreTopShadow:    false,
		ignoreRightShadow:  false,
		ignoreBottomShadow: false,
		ignoreLeftShadow:   false,
		hideXScrollbar:     false,
		hideYScrollbar:     false,
		y2xScroll:          false,
		children:           null
	};

	state = {
		topShadow:    false,
		rightShadow:  false,
		bottomShadow: false,
		leftShadow:   false
	};

	isHiddenScrollbar = false;
	scroller = null;

	render() {

		const {
			ignoreTopShadow,
			ignoreRightShadow,
			ignoreBottomShadow,
			ignoreLeftShadow,
			hideXScrollbar,
			hideYScrollbar,
			children,
			...props
		} = this.props;

		const {
			topShadow,
			rightShadow,
			bottomShadow,
			leftShadow
		} = this.state;

		return (
			<div
				{...getHtmlProps(props)}
				{...stylesheet('root', {}, props)}
			>
				<div
					ref={this.onScrollerRef}
					{...stylesheet('scroller', {
						hideXScrollbar,
						hideYScrollbar
					})}
					onScroll={this.onScroll}
					onWheel={this.onWheel}
				>
					{children}
				</div>
				<div
					{...stylesheet('shadow', {
						'top':    true,
						'active': topShadow && !ignoreTopShadow
					})}
				/>
				<div
					{...stylesheet('shadow', {
						'right':  true,
						'active': rightShadow && !ignoreRightShadow
					})}
				/>
				<div
					{...stylesheet('shadow', {
						'bottom': true,
						'active': bottomShadow && !ignoreBottomShadow
					})}
				/>
				<div
					{...stylesheet('shadow', {
						'left':   true,
						'active': leftShadow && !ignoreLeftShadow
					})}
				/>
			</div>
		);
	}

	componentDidUpdate() {
		this.setShadow(this.scroller);
		this.hideScroll(this.scroller);
	}

	@Listener()
	onScrollerRef(ref) {
		this.scroller = ref;
		this.setShadow(ref);
		this.hideScroll(ref);
	}

	@Listener()
	onScroll({ currentTarget }: UIEvent<HTMLDivElement>) {
		this.setShadow(currentTarget);
	}

	@Listener()
	onWheel(event: WheelEvent<HTMLDivElement>) {

		const {
			isHiddenScrollbar
		} = this;
		const {
			y2xScroll
		} = this.props;

		const {
			deltaY,
			currentTarget
		} = event;

		if (y2xScroll && !isHiddenScrollbar) {
			event.preventDefault();
			currentTarget.scrollLeft -= deltaY;
		}
	}

	setShadow(element) {

		if (!element) {
			return;
		}

		const {
			scrollLeft,
			scrollTop,
			scrollWidth,
			scrollHeight,
			clientWidth,
			clientHeight
		} = element;

		this.setState(() => ({
			topShadow:    scrollTop > 0,
			rightShadow:  scrollLeft + clientWidth < scrollWidth,
			bottomShadow: scrollTop + clientHeight < scrollHeight,
			leftShadow:   scrollLeft > 0
		}));
	}

	hideScroll(element) {

		if (!element) {
			return;
		}

		const {
			hideXScrollbar,
			hideYScrollbar
		} = this.props;

		const xOffset = element.offsetHeight - element.clientHeight;
		const yOffset = element.offsetWidth - element.clientWidth;

		this.isHiddenScrollbar = !xOffset;

		if (hideXScrollbar) {
			element.style.marginBottom = `-${xOffset}px`;
		} else {
			element.style.marginBottom = 0;
		}

		if (hideYScrollbar) {
			element.style.marginRight = `-${yOffset}px`;
		} else {
			element.style.marginRight = 0;
		}
	}
}

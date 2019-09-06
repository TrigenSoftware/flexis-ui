import React, {
	HTMLAttributes,
	UIEvent,
	WheelEvent,
	ReactNode,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes,
	Bind,
	omit
} from '../../helpers';
import {
	style,
	classes
} from './ScrollArea.st.css';

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

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	HTMLAttributes<HTMLDivElement>
>;

interface IState {
	topShadow: boolean;
	rightShadow: boolean;
	bottomShadow: boolean;
	leftShadow: boolean;
}

export default class ScrollArea extends PureComponent<IProps, IState> {

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
		y2xScroll:          false
	};

	state = {
		topShadow:    false,
		rightShadow:  false,
		bottomShadow: false,
		leftShadow:   false
	};

	private isHiddenScrollbar = false;
	private scroller: HTMLDivElement = null;

	render() {

		const {
			className,
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
				{...omit(props, ['y2xScroll'])}
				className={style(classes.root, className)}
			>
				<div
					ref={this.onScrollerRef}
					className={style(classes.scroller, {
						hideXScrollbar,
						hideYScrollbar
					})}
					onScroll={this.onScroll}
					onWheel={this.onWheel}
				>
					{children}
				</div>
				<div
					className={style(classes.shadow, {
						'top':    true,
						'active': topShadow && !ignoreTopShadow
					})}
				/>
				<div
					className={style(classes.shadow, {
						'right':  true,
						'active': rightShadow && !ignoreRightShadow
					})}
				/>
				<div
					className={style(classes.shadow, {
						'bottom': true,
						'active': bottomShadow && !ignoreBottomShadow
					})}
				/>
				<div
					className={style(classes.shadow, {
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

	@Bind()
	private onScrollerRef(ref: HTMLDivElement) {
		this.scroller = ref;
		this.setShadow(ref);
		this.hideScroll(ref);
	}

	@Bind()
	private onScroll({ currentTarget }: UIEvent<HTMLDivElement>) {
		this.setShadow(currentTarget);
	}

	@Bind()
	private onWheel(event: WheelEvent<HTMLDivElement>) {

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

	private setShadow(element: HTMLDivElement) {

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

	private hideScroll(element: HTMLDivElement) {

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
			element.style.marginBottom = '0';
		}

		if (hideYScrollbar) {
			element.style.marginRight = `-${yOffset}px`;
		} else {
			element.style.marginRight = '0';
		}
	}
}

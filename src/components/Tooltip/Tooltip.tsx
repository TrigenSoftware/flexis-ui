import React, {
	AllHTMLAttributes,
	ReactNode,
	PureComponent
} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes,
	Listener,
	getHtmlProps
} from '../../helpers';
import setOverflowOffset from '../common/setOverflowOffset';
import stylesheet from './Tooltip.st.css';

interface ISelfProps {
	id?: string;
	tabIndex?: number;
	placement: 'top'|'right'|'bottom'|'left';
	align?: 'start'|'center'|'end';
	content: ReactNode;
	children: ReactNode;
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	AllHTMLAttributes<HTMLDivElement>
>;

interface IState {
	active: boolean;
}

const HALF = 2;

export default class Tooltip extends PureComponent<IProps, IState> {

	static propTypes = {
		id:        PropTypes.string,
		tabIndex:  PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string
		]),
		placement: PropTypes.oneOf([
			'top',
			'right',
			'bottom',
			'left'
		]).isRequired,
		align:     PropTypes.oneOf([
			'start',
			'center',
			'end'
		]),
		content:   PropTypes.node.isRequired,
		children:  PropTypes.node.isRequired
	};

	static defaultProps = {
		id:       null,
		tabIndex: 0,
		align:    'center'
	};

	state = {
		active: false
	};

	private elementRef: HTMLSpanElement = null;
	private tooltipRef: HTMLDivElement = null;

	render() {

		const {
			id,
			tabIndex,
			content,
			placement,
			align,
			children,
			...props
		} = this.props;

		const {
			active
		} = this.state;

		return (
			<span
				{...stylesheet('root', {}, props)}
				ref={this.onElementRef}
				onMouseEnter={this.onShow}
				onFocus={this.onShow}
				onMouseLeave={this.onHide}
				onBlur={this.onHide}
				tabIndex={tabIndex}
				aria-describedby={id}
			>
				{children}
				{createPortal((
					<div
						id={id}
						role='tooltip'
						{...getHtmlProps(props)}
						{...stylesheet('tooltip', {
							[`${placement}Placement`]: Boolean(placement),
							[`${align}Align`]:         Boolean(align),
							active
						}, props)}
						ref={this.onTooltipRef}
						aria-hidden={!active}
					>
						{content}
					</div>
				), document.body)}
			</span>
		);
	}

	componentDidUpdate(_, { active: prevActive }: IState) {

		const {
			active
		} = this.state;

		if (!prevActive && active) {
			this.setTooltipPosition();
		}
	}

	@Listener()
	private onElementRef(ref: HTMLSpanElement) {
		this.elementRef = ref;
	}

	@Listener()
	private onTooltipRef(ref: HTMLDivElement) {
		this.tooltipRef = ref;
	}

	@Listener()
	private onShow() {
		this.setState(() => ({
			active: true
		}));
	}

	@Listener()
	private onHide() {
		this.setState(() => ({
			active: false
		}));
	}

	private setTooltipPosition() {

		const {
			elementRef,
			tooltipRef
		} = this;

		if (!elementRef || !tooltipRef) {
			return;
		}

		const {
			placement,
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
			offsetHeight: tooltipHeight,
			style
		} = tooltipRef;

		let top = 0;
		let left = 0;

		switch (placement) {

			case 'top':
				top = elementTop;
				break;

			case 'right':
				left = elementLeft + elementWidth - tooltipWidth;
				break;

			case 'bottom':
				top = elementTop + elementHeight - tooltipHeight;
				break;

			case 'left':
				left = elementLeft;
				break;

			default:
		}

		switch (align) {

			case 'start':

				switch (placement) {

					case 'top':
					case 'bottom':
						left = elementLeft;
						break;

					case 'right':
					case 'left':
						top = elementTop;
						break;

					default:
				}

				break;

			case 'center':

				switch (placement) {

					case 'top':
					case 'bottom':
						left = elementLeft + elementWidth / HALF;
						break;

					case 'right':
					case 'left':
						top = elementTop + elementHeight / HALF;
						break;

					default:
				}

				break;

			case 'end':

				switch (placement) {

					case 'top':
					case 'bottom':
						left = elementLeft + elementWidth - tooltipWidth;
						break;

					case 'right':
					case 'left':
						top = elementTop + elementHeight - tooltipHeight;
						break;

					default:
				}

				break;

			default:
		}

		style.top = `${top}px`;
		style.left = `${left}px`;

		setOverflowOffset(tooltipRef, top, left);
	}
}

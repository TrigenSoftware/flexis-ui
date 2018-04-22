import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import {
	Stylable,
	Listener,
	getHtmlProps
} from '../../helpers';
import stylesheet from './Tooltip.st.css';

@Stylable(stylesheet)
export default class Tooltip extends PureComponent {

	static propTypes = {
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
		content:   PropTypes.any.isRequired,
		children:  PropTypes.any.isRequired
	};

	static defaultProps = {
		tabIndex: 1,
		align:    'center'
	};

	state = {
		active:    false,
		boxTop:    0,
		boxLeft:   0,
		boxWidth:  0,
		boxHeight: 0
	};

	render() {

		const {
			tabIndex,
			content,
			placement,
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

		return (
			<span
				onMouseEnter={this.onShow()}
				onFocus={this.onShow()}
				onMouseLeave={this.onHide()}
				onBlur={this.onHide()}
				tabIndex={tabIndex}
			>
				{children}
				{createPortal((
					<div
						className='box'
						style={{
							top:    boxTop,
							left:   boxLeft,
							width:  boxWidth,
							height: boxHeight
						}}
					>
						<div
							{...getHtmlProps(props)}
							className='tooltip'
							style-state={{
								[`${placement}Placement`]: placement,
								[`${align}Align`]:         align,
								active
							}}
						>
							{content}
						</div>
					</div>
				), document.body)}
			</span>
		);
	}

	@Listener()
	onShow(event) {

		const boxPosition = this.getBoxPosition(event.currentTarget);

		this.setState(() => ({
			active: true,
			...boxPosition
		}));
	}

	@Listener()
	onHide() {
		this.setState(() => ({
			active: false
		}));
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

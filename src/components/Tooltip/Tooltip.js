import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import {
	Stylable,
	Listener,
	getHtmlProps,
	hasFixedLineage
} from '../helpers';
import stylesheet from './Tooltip.st.css';

@Stylable(stylesheet)
export default class Tooltip extends PureComponent {

	static propTypes = {
		content:   PropTypes.any,
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
		children:  PropTypes.any.isRequired
	};

	static defaultProps = {
		content: null,
		align:   'center'
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
	onShow({ currentTarget }) {

		const {
			top:  bodyTop,
			left: bodyLeft
		} = document.body.getBoundingClientRect();

		const {
			top,
			left,
			width,
			height
		} = currentTarget.getBoundingClientRect();

		const withFixedLineage = hasFixedLineage(currentTarget);

		this.setState(() => ({
			active:    true,
			boxTop:    withFixedLineage
				? top
				: top - bodyTop,
			boxLeft:   withFixedLineage
				? left
				: left - bodyLeft,
			boxWidth:  width,
			boxHeight: height
		}));
	}

	@Listener()
	onHide() {
		this.setState(() => ({
			active: false
		}));
	}
}

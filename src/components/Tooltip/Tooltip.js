import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import {
	Listener,
	getHtmlProps
} from '../../helpers';
import stylesheet from './Tooltip.st.css';

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
		active: false
	};

	elementRef = null;
	boxRef = null;

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
			active
		} = this.state;

		return (
			<span
				{...stylesheet('root', {}, props)}
				ref={this.onElementRef()}
				onMouseEnter={this.onShow()}
				onFocus={this.onShow()}
				onMouseLeave={this.onHide()}
				onBlur={this.onHide()}
				tabIndex={tabIndex}
			>
				{children}
				{createPortal((
					<div
						{...stylesheet('box')}
						ref={this.onBoxRef()}
					>
						<div
							{...getHtmlProps(props)}
							{...stylesheet('tooltip', {
								[`${placement}Placement`]: placement,
								[`${align}Align`]:         align,
								active
							}, props)}
						>
							{content}
						</div>
					</div>
				), document.body)}
			</span>
		);
	}

	componentDidUpdate(_, { active: prevActive }) {

		const {
			active
		} = this.state;

		if (!prevActive && active) {
			this.setBoxPosition();
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
	onShow() {
		this.setState(() => ({
			active: true
		}));
	}

	@Listener()
	onHide() {
		this.setState(() => ({
			active: false
		}));
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

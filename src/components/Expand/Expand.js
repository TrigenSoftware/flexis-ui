import React, {
	PureComponent,
	Children,
	cloneElement
} from 'react';
import PropTypes from 'prop-types';
import {
	Stylable,
	Listener,
	getHtmlProps
} from '../../helpers';
import stylesheet from './Expand.st.css';

export * from './ExpandTitle';
export * from './ExpandContent';

@Stylable(stylesheet)
export default class Expand extends PureComponent {

	static propTypes = {
		onToggle:      PropTypes.func,
		defaultActive: PropTypes.bool,
		active:        PropTypes.bool,
		disabled:      PropTypes.bool,
		children:      PropTypes.arrayOf(
			PropTypes.element
		).isRequired
	};

	static defaultProps = {
		onToggle:      null,
		defaultActive: false,
		active:        null,
		disabled:      false
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
			children,
			...props
		} = this.props;

		const {
			active
		} = this.state;

		const [
			title,
			content
		] = Children.toArray(children);

		return (
			<div
				{...getHtmlProps(props)}
				style-state={{
					active,
					disabled
				}}
			>
				{cloneElement(
					title,
					{
						onClick: this.onToggle()
					}
				)}
				{content}
			</div>
		);
	}

	@Listener()
	onToggle(event) {
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
}

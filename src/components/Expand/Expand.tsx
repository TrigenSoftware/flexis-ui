import React, {
	HTMLAttributes,
	SyntheticEvent,
	MouseEvent,
	ReactElement,
	PureComponent,
	Children,
	cloneElement
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes,
	Bind,
	getAriaLabelProps
} from '../../helpers';
import stylesheet from './Expand.st.css';

export * from './ExpandTitle';
export * from './ExpandContent';

interface ISelfProps {
	defaultActive?: boolean;
	active?: boolean;
	disabled?: boolean;
	children: ReactElement<any>[];
	onToggle?(active: boolean, event: Event|SyntheticEvent);
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	HTMLAttributes<HTMLDivElement>
>;

interface IState {
	active: boolean;
}

export default class Expand extends PureComponent<IProps, IState> {

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

	static getDerivedStateFromProps(
		{
			active,
			disabled
		}: IProps,
		{ active: prevActive }: IState
	): IState {

		const nextActive = !disabled && (typeof active === 'boolean'
			? active
			: prevActive
		);

		if (nextActive === prevActive) {
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
		] = Children.toArray<ReactElement<any>>(children);

		return (
			<div
				{...props}
				{...stylesheet('root', {
					active,
					disabled
				}, props)}
				aria-disabled={disabled}
			>
				{cloneElement(title, {
					'onClick':       this.onToggle,
					'aria-haspopup': true,
					'aria-expanded': active,
					'aria-disabled': disabled,
					'disabled':      disabled
				})}
				{cloneElement(content, {
					...getAriaLabelProps({
						role:       'region',
						labelledBy: title.props.id
					}, content.props),
					'aria-hidden':  !active
				})}
			</div>
		);
	}

	@Bind()
	private onToggle(event: MouseEvent) {
		this.toggleActiveState(null, event);
	}

	toggleActiveState(forceState?: boolean, event: Event|SyntheticEvent = null) {

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
		const nextActive = typeof forceState === 'boolean'
			? forceState
			: !active;

		if (nextActive === active) {
			return;
		}

		if (typeof activeProp !== 'boolean') {
			this.setState(() => ({
				active: nextActive
			}));
		}

		if (typeof onToggle === 'function') {
			onToggle(nextActive, event);
		}
	}
}

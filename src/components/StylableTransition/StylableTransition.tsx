import React, {
	Component
} from 'react';
import PropTypes from 'prop-types';
import addClass from 'dom-helpers/class/addClass';
import removeClass from 'dom-helpers/class/removeClass';
import Transition, {
	TransitionProps
} from 'react-transition-group/Transition';
import {
	StateMap
} from '@stylable/runtime';
import {
	CombinePropsAndAttributes,
	Bind,
	omit
} from '../../helpers';

export interface ITransitionState {
	active?: string;
	enter?: string;
	enterActive?: string;
	enterDone?: string;
	exit?: string;
	exitActive?: string;
	exitDone?: string;
}

interface ISelfProps {
	states: ((stateMap: StateMap) => string) | ITransitionState;
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	TransitionProps
>;

const defaultStylableStates: ITransitionState = {
	active:      'active',
	enter:       'enter',
	enterActive: 'enterActive',
	enterDone:   'enterDone',
	exit:        'exit',
	exitActive:  'exitActive',
	exitDone:    'exitDone'
};
const TransitionStateKeys = Object.keys(defaultStylableStates);

export default class StylableTransition extends Component<IProps> {

	static propTypes = {
		...(Transition as any).propTypes,
		states:     PropTypes.oneOfType([
			PropTypes.func,
			PropTypes.object
		]).isRequired,
		onEnter:    PropTypes.func,
		onEntering: PropTypes.func,
		onEntered:  PropTypes.func,
		onExit:     PropTypes.func,
		onExiting:  PropTypes.func,
		onExited:   PropTypes.func
	};

	private readonly stylableStates: {
		active: Record<string, string>,
		enter: Record<string, string>,
		exit: Record<string, string>
	};

	constructor(props: IProps) {

		super(props);

		const {
			states
		} = props;
		const getStateClass = typeof states === 'function'
			? (state: string) => states({ [state]: true })
			: (state: string) => states[state];
		const stylableStates = {
			active: {},
			enter:  {},
			exit:   {}
		};

		TransitionStateKeys.forEach((key: string) => {

			const [state, phase] = key
				.replace(/(Active|Done)/, ' $1')
				.toLowerCase()
				.split(' ');

			if (stylableStates.hasOwnProperty(state)) {
				stylableStates[state][phase || 'state'] = getStateClass(key);
			}
		});

		this.stylableStates = stylableStates;
	}

	render() {

		const props: any = omit(this.props, [
			'states'
		]);

		return (
			<Transition
				{...props}
				onEnter={this.onEnter}
				onEntered={this.onEntered}
				onEntering={this.onEntering}
				onExit={this.onExit}
				onExiting={this.onExiting}
				onExited={this.onExited}
			/>
		);
	}

	@Bind()
	private onEnter(node: HTMLElement) {

		const stateClass = this.getStateClass('enter');

		this.removeStateClass(node, 'exit');

		if (stateClass) {
			addClass(node, stateClass);
		}

		const {
			onEnter
		} = this.props;

		if (typeof onEnter === 'function') {
			onEnter(node);
		}
	}

	@Bind()
	private onEntering(node: HTMLElement) {

		const enterStateClass = this.getStateClass('enter', 'active');
		const activeStateClass = this.getStateClass('active');

		if (enterStateClass) {
			this.reflowAndAddStateClass(node, enterStateClass);
		}

		if (activeStateClass) {

			if (enterStateClass) {
				addClass(node, activeStateClass);
			} else {
				this.reflowAndAddStateClass(node, activeStateClass);
			}
		}

		const {
			onEntering
		} = this.props;

		if (typeof onEntering === 'function') {
			onEntering(node);
		}
	}

	@Bind()
	private onEntered(node: HTMLElement) {

		const stateClass = this.getStateClass('enter', 'done');

		this.removeStateClass(node, 'enter');

		if (stateClass) {
			addClass(node, stateClass);
		}

		const {
			onEntered
		} = this.props;

		if (typeof onEntered === 'function') {
			onEntered(node);
		}
	}

	@Bind()
	private onExit(node: HTMLElement) {

		const stateClass = this.getStateClass('exit');

		this.removeStateClass(node, 'enter');
		this.removeStateClass(node, 'active');

		if (stateClass) {
			addClass(node, stateClass);
		}

		const {
			onExit
		} = this.props;

		if (typeof onExit === 'function') {
			onExit(node);
		}
	}

	@Bind()
	private onExiting(node: HTMLElement) {

		const stateClass = this.getStateClass('exit', 'active');

		if (stateClass) {
			this.reflowAndAddStateClass(node, stateClass);
		}

		const {
			onExiting
		} = this.props;

		if (typeof onExiting === 'function') {
			onExiting(node);
		}
	}

	@Bind()
	private onExited(node: HTMLElement) {

		const stateClass = this.getStateClass('exit', 'done');

		this.removeStateClass(node, 'exit');

		if (stateClass) {
			addClass(node, stateClass);
		}

		const {
			onExited
		} = this.props;

		if (typeof onExited === 'function') {
			onExited(node);
		}
	}

	private getStateClass(state: string, phase = 'state') {

		const phases = this.stylableStates[state];

		if (!phases) {
			return false;
		}

		return phases[phase] || false;
	}

	private removeStateClass(node: HTMLElement, state: string) {

		const phases = this.stylableStates[state];

		if (!phases) {
			return;
		}

		const {
			state: stateClass,
			active: activePhaseClass,
			done: donePhaseClass
		} = phases;

		if (stateClass) {
			removeClass(node, stateClass);
		}

		if (activePhaseClass) {
			removeClass(node, activePhaseClass);
		}

		if (donePhaseClass) {
			removeClass(node, donePhaseClass);
		}
	}

	private reflowAndAddStateClass(node: HTMLElement, stateClass: string) {

		if (node) {
			// This is for to force a repaint,
			// which is necessary in order to transition styles when adding a class name.
			node.scrollTop; // tslint:disable-line
			addClass(node, stateClass);
		}
	}
}

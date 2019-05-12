import React, {
	Component
} from 'react';
import PropTypes from 'prop-types';
import Transition, {
	TransitionProps
} from 'react-transition-group/Transition';
import {
	RuntimeStylesheet
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
	states: RuntimeStylesheet|ITransitionState;
	statesElement?: string;
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

export default class StylableTransition extends Component<IProps> {

	static propTypes = {
		...(Transition as any).propTypes,
		states:        PropTypes.oneOfType([
			PropTypes.func,
			PropTypes.object
		]).isRequired,
		statesElement: PropTypes.string,
		onEnter:       PropTypes.func,
		onEntering:    PropTypes.func,
		onEntered:     PropTypes.func,
		onExit:        PropTypes.func,
		onExiting:     PropTypes.func,
		onExited:      PropTypes.func
	};

	static defaultProps = {
		statesElement: 'root',
		onEnter:       null,
		onEntering:    null,
		onEntered:     null,
		onExit:        null,
		onExiting:     null,
		onExited:      null
	};

	private readonly stylableStates: {
		active: Record<string, string>,
		enter: Record<string, string>,
		exit: Record<string, string>
	};

	constructor(props) {

		super(props);

		const {
			states,
			statesElement
		} = props;
		const stylableStatesSource = typeof states === 'function'
			? states(statesElement, defaultStylableStates)
			: states;
		const stylableStates = {
			active: {},
			enter:  {},
			exit:   {}
		};

		Object.entries(stylableStatesSource).forEach(([value, key]: [string, string]) => {

			const [state, phase] = key
				.replace(/(Active|Done)/, ' $1')
				.toLowerCase()
				.split(' ');

			if (stylableStates.hasOwnProperty(state)) {
				stylableStates[state][phase || 'state'] = value;
			}
		});

		this.stylableStates = stylableStates;
	}

	render() {

		const props: any = omit(this.props, [
			'states',
			'statesElement'
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
	private onEnter(node) {

		const stateAttribute = this.getStateAttribute('enter');

		this.removeStateAttributes(node, 'exit');

		if (stateAttribute) {
			node.setAttribute(stateAttribute, 'true');
		}

		const {
			onEnter
		} = this.props;

		if (typeof onEnter === 'function') {
			onEnter(node);
		}
	}

	@Bind()
	private onEntering(node) {

		const enterStateAttribute = this.getStateAttribute('enter', 'active');
		const activeStateAttribute = this.getStateAttribute('active');

		if (enterStateAttribute) {
			this.reflowAndAddStateAttribute(node, enterStateAttribute);
		}

		if (activeStateAttribute) {

			if (enterStateAttribute) {
				node.setAttribute(activeStateAttribute, 'true');
			} else {
				this.reflowAndAddStateAttribute(node, activeStateAttribute);
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
	private onEntered(node) {

		const stateAttribute = this.getStateAttribute('enter', 'done');

		this.removeStateAttributes(node, 'enter');

		if (stateAttribute) {
			node.setAttribute(stateAttribute, 'true');
		}

		const {
			onEntered
		} = this.props;

		if (typeof onEntered === 'function') {
			onEntered(node);
		}
	}

	@Bind()
	private onExit(node) {

		const stateAttribute = this.getStateAttribute('exit');

		this.removeStateAttributes(node, 'enter');
		this.removeStateAttributes(node, 'active');

		if (stateAttribute) {
			node.setAttribute(stateAttribute, 'true');
		}

		const {
			onExit
		} = this.props;

		if (typeof onExit === 'function') {
			onExit(node);
		}
	}

	@Bind()
	private onExiting(node) {

		const stateAttribute = this.getStateAttribute('exit', 'active');

		if (stateAttribute) {
			this.reflowAndAddStateAttribute(node, stateAttribute);
		}

		const {
			onExiting
		} = this.props;

		if (typeof onExiting === 'function') {
			onExiting(node);
		}
	}

	@Bind()
	private onExited(node) {

		const stateAttribute = this.getStateAttribute('exit', 'done');

		this.removeStateAttributes(node, 'exit');

		if (stateAttribute) {
			node.setAttribute(stateAttribute, 'true');
		}

		const {
			onExited
		} = this.props;

		if (typeof onExited === 'function') {
			onExited(node);
		}
	}

	private getStateAttribute(state, phase = 'state') {

		const phases = this.stylableStates[state];

		if (!phases) {
			return false;
		}

		return phases[phase] || false;
	}

	private removeStateAttributes(node, state) {

		const phases = this.stylableStates[state];

		if (!phases) {
			return;
		}

		const {
			state: stateAttr,
			active: activePhaseAttr,
			done: donePhaseAttr
		} = phases;

		if (stateAttr) {
			node.removeAttribute(stateAttr);
		}

		if (activePhaseAttr) {
			node.removeAttribute(activePhaseAttr);
		}

		if (donePhaseAttr) {
			node.removeAttribute(donePhaseAttr);
		}
	}

	private reflowAndAddStateAttribute(node, stateAttribute) {

		if (node) {
			// This is for to force a repaint,
			// which is necessary in order to transition styles when adding a class name.
			node.scrollTop; // tslint:disable-line
			node.setAttribute(stateAttribute, 'true');
		}
	}
}

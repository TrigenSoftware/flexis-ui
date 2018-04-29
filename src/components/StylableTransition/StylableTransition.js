import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { Listener } from '../../helpers';

const defaultStylableStates = {
	appear:       'appear',
	appearActive: 'appearActive',
	enter:        'enter',
	enterActive:  'enterActive',
	enterDone:    'enterDone',
	exit:         'exit',
	exitActive:   'exitActive',
	exitDone:     'exitDone'
};

export default class StylableTransition extends Component {

	static propTypes = {
		...Transition.propTypes,
		states:     PropTypes.oneOf([
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

	static defaultProps = {
		onEnter:    null,
		onEntering: null,
		onEntered:  null,
		onExit:     null,
		onExiting:  null,
		onExited:   null
	};

	constructor(props) {

		super(props);

		const {
			states
		} = props;

		const stylableStatesSource = typeof states == 'function'
			? states('root', defaultStylableStates)
			: states;

		const stylableStates = {
			appear: {},
			enter:  {},
			exit:   {}
		};

		Object.entries(stylableStatesSource).forEach(([value, key]) => {

			const [state, phase] = key
				.replace(/([AD])/, ' $1')
				.toLowerCase()
				.split(' ');

			if (stylableStates.hasOwnProperty(state)) {
				stylableStates[state][phase || 'state'] = value;
			}
		});

		this.stylableStates = stylableStates;
	}

	render() {

		const props = { ...this.props };

		Reflect.deleteProperty(props, 'states');

		return (
			<Transition
				{...props}
				onEnter={this.onEnter()}
				onEntered={this.onEntered()}
				onEntering={this.onEntering()}
				onExit={this.onExit()}
				onExiting={this.onExiting()}
				onExited={this.onExited()}
			/>
		);
	}

	@Listener()
	onEnter(node, appearing) {

		const stateAttribute = this.getStateAttribute(
			appearing
				? 'appear'
				: 'enter'
		);

		this.removeStateAttributes(node, 'exit');

		if (stateAttribute) {
			node.setAttribute(stateAttribute, 'true');
		}

		const {
			onEnter
		} = this.props;

		if (typeof onEnter == 'function') {
			onEnter(node);
		}
	}

	@Listener()
	onEntering(node, appearing) {

		const stateAttribute = this.getStateAttribute(
			appearing
				? 'appear'
				: 'enter',
			'active'
		);

		if (stateAttribute) {
			this.reflowAndAddStateAttribute(node, stateAttribute);
		}

		const {
			onEntering
		} = this.props;

		if (typeof onEntering == 'function') {
			onEntering(node);
		}
	}

	@Listener()
	onEntered(node, appearing) {

		const stateAttribute = this.getStateAttribute(
			'enter',
			'done'
		);

		this.removeStateAttributes(
			node,
			appearing
				? 'appear'
				: 'enter'
		);

		if (stateAttribute) {
			node.setAttribute(stateAttribute, 'true');
		}

		const {
			onEntered
		} = this.props;

		if (typeof onEntered == 'function') {
			onEntered(node);
		}
	}

	@Listener()
	onExit(node) {

		const stateAttribute = this.getStateAttribute('exit');

		this.removeStateAttributes(node, 'appear');
		this.removeStateAttributes(node, 'enter');

		if (stateAttribute) {
			node.setAttribute(stateAttribute, 'true');
		}

		const {
			onExit
		} = this.props;

		if (typeof onExit == 'function') {
			onExit(node);
		}
	}

	@Listener()
	onExiting(node) {

		const stateAttribute = this.getStateAttribute('exit', 'active');

		if (stateAttribute) {
			this.reflowAndAddStateAttribute(node, stateAttribute);
		}

		const {
			onExiting
		} = this.props;

		if (typeof onExiting == 'function') {
			onExiting(node);
		}
	}

	@Listener()
	onExited(node) {

		const stateAttribute = this.getStateAttribute('exit', 'done');

		this.removeStateAttributes(node, 'exit');

		if (stateAttribute) {
			node.setAttribute(stateAttribute, 'true');
		}

		const {
			onExited
		} = this.props;

		if (typeof onExited == 'function') {
			onExited(node);
		}
	}

	getStateAttribute(state, phase = 'state') {

		const phases = this.stylableStates[state];

		if (!phases) {
			return false;
		}

		return phases[phase] || false;
	}

	removeStateAttributes(node, state) {

		const phases = this.stylableStates[state];

		if (!phases) {
			return;
		}

		const {
			state:  stateAttr,
			active: activePhaseAttr,
			done:   donePhaseAttr
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

	reflowAndAddStateAttribute(node, stateAttribute) {

		if (node) {
			// This is for to force a repaint,
			// which is necessary in order to transition styles when adding a class name.
			/* eslint-disable no-unused-expressions */
			// node.scrollTop;
			/* eslint-enable no-unused-expressions */
			node.setAttribute(stateAttribute, 'true');
		}
	}
}

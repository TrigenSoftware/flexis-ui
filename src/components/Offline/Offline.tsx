import {
	ReactNode,
	Component
} from 'react';
import PropTypes from 'prop-types';
import {
	subscribeEvent,
	Bind
} from '../../helpers';

export interface IProps {
	children?(isOffline: boolean): ReactNode;
	onChange?(isOffline: boolean);
}

export default class Offline extends Component<IProps> {

	static propTypes = {
		children: PropTypes.func,
		onChange: PropTypes.func
	};

	private unsubscribeOnlineEvent: () => void = null;
	private unsubscribeOfflineEvent: () => void = null;

	render() {

		const {
			children
		} = this.props;

		return typeof children === 'function'
			? children(typeof navigator !== 'undefined' && !navigator.onLine)
			: null;
	}

	componentDidMount() {

		if (!navigator.onLine) {
			this.onChange();
		}

		this.addEffects();
	}

	componentWillUnmount() {
		this.removeEffects();
	}

	@Bind()
	private onChange(event?: Event) {

		const {
			onChange
		} = this.props;

		if (event) {
			this.forceUpdate();
		}

		if (typeof onChange === 'function') {
			onChange(!navigator.onLine);
		}
	}

	private addEffects() {
		this.unsubscribeOnlineEvent = subscribeEvent(
			window,
			'online',
			this.onChange
		);
		this.unsubscribeOfflineEvent = subscribeEvent(
			window,
			'offline',
			this.onChange
		);
	}

	private removeEffects() {
		this.unsubscribeOnlineEvent();
		this.unsubscribeOnlineEvent = null;
		this.unsubscribeOfflineEvent();
		this.unsubscribeOfflineEvent = null;
	}
}

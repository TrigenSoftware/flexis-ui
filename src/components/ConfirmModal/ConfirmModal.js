import React, { PureComponent } from 'react';
import { Listener } from '../../helpers';
import Modal from '../Modal';
import stylesheet from './ConfirmModal.st.css';

export default class ConfirmModal extends PureComponent {

	static propTypes = {
		...Modal.propTypes
	};

	static defaultProps = {
		...Modal.defaultProps
	};

	state = {
		active: false
	};

	resolver = null;
	promise = null;

	render() {

		const {
			children,
			...props
		} = this.props;

		const {
			active
		} = this.state;

		return (
			<Modal
				{...props}
				{...stylesheet('root', {}, props)}
				onClose={this.onClose()}
				active={active}
			>
				<form
					{...stylesheet('form')}
					onSubmit={this.onSubmit()}
					onClick={this.onClick()}
				>
					{children}
				</form>
			</Modal>
		);
	}

	@Listener()
	async onSubmit(event) {
		event.preventDefault();
		event.stopPropagation();
		await this.setActiveState(false);
		this.resolve(true);
	}

	@Listener()
	onClick({ target }) {

		if (target.type === 'reset') {
			this.hide();
		}
	}

	@Listener()
	onClose() {
		this.hide();
	}

	resolve(state) {

		const {
			resolver
		} = this;

		if (typeof resolver == 'function') {
			resolver(state);
			this.resolver = null;
			this.promise = null;
		}
	}

	setActiveState(active) {
		return new Promise((resolve) => {
			this.setState(() => ({
				active
			}), resolve);
		});
	}

	show() {

		if (!this.promise) {
			this.promise = new Promise((resolve) => {
				this.resolver = resolve;
				this.setActiveState(true);
			});
		}

		return this.promise;
	}

	async hide() {
		await this.setActiveState(false);
		this.resolve(false);
	}
}

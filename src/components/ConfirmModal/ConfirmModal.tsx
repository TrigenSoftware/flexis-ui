import React, {
	FormEvent,
	MouseEvent,
	PureComponent
} from 'react';
import {
	Bind
} from '../../helpers';
import Modal, {
	IProps as IModalProps
} from '../Modal';
import {
	style,
	classes
} from './ConfirmModal.st.css';

export type IProps = IModalProps;

interface IState {
	active: boolean;
}

export default class ConfirmModal extends PureComponent<IProps, IState> {

	static propTypes = {
		...Modal.propTypes
	};

	static defaultProps = {
		...Modal.defaultProps
	};

	state = {
		active: false
	};

	private resolver: (state: boolean) => void = null;
	private promise: Promise<boolean> = null;

	render() {

		const {
			className,
			children,
			...props
		} = this.props;
		const {
			active
		} = this.state;

		return (
			<Modal
				{...props}
				className={style(classes.root, className)}
				onClose={this.onClose}
				active={active}
			>
				<form
					className={classes.form}
					onSubmit={this.onSubmit}
					onClick={this.onClick}
				>
					{children}
				</form>
			</Modal>
		);
	}

	@Bind()
	private async onSubmit(event: FormEvent) {
		event.preventDefault();
		event.stopPropagation();
		await this.setActiveState(false);
		this.resolve(true);
	}

	@Bind()
	private onClick(
		{ target }: MouseEvent<HTMLFormElement> & { target: HTMLButtonElement }
	) {

		if (target.type === 'reset') {
			this.hide();
		}
	}

	@Bind()
	private onClose() {
		this.hide();
	}

	resolve(state: boolean) {

		const {
			resolver
		} = this;

		if (typeof resolver === 'function') {
			resolver(state);
			this.resolver = null;
			this.promise = null;
		}
	}

	setActiveState(active: boolean) {
		return new Promise((resolve) => {
			this.setState(() => ({
				active
			}), resolve);
		});
	}

	show() {

		if (!this.promise) {
			this.promise = new Promise<boolean>((resolve) => {
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

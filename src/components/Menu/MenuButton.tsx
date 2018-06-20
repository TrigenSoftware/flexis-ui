import React, { PureComponent } from 'react';
import Button, { IProps as IButtonProps } from '../Button';
import stylesheet from './Menu.st.css';

export type IMenuButtonProps = IButtonProps;

export class MenuButton extends PureComponent<IMenuButtonProps> {

	static propTypes = Button.propTypes;
	static defaultProps = Button.defaultProps;

	render() {

		const {
			children,
			...props
		} = this.props;

		return (
			<Button
				{...props}
				{...stylesheet('button', {}, props)}
				type='button'
			>
				{children}
			</Button>
		);
	}
}

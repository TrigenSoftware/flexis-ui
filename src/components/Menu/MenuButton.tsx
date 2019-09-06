import React, {
	PureComponent
} from 'react';
import Button, {
	IProps as IButtonProps
} from '../Button';
import {
	style,
	classes
} from './Menu.st.css';

export type IMenuButtonProps = IButtonProps;

export class MenuButton extends PureComponent<IMenuButtonProps> {

	static propTypes = Button.propTypes;
	static defaultProps = Button.defaultProps;

	render() {

		const {
			className,
			children,
			...props
		} = this.props;

		return (
			<Button
				{...props}
				className={style(classes.button, className)}
				type='button'
			>
				{children}
			</Button>
		);
	}
}

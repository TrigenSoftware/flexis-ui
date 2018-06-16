import React from 'react';
import Button from '../Button';
import stylesheet from './Menu.st.css';

MenuButton.propTypes = Button.propTypes;
MenuButton.defaultProps = Button.defaultProps;

export function MenuButton({
	children,
	...props
}) {
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

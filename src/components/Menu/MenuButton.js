import React from 'react';
import Button from '../Button';

MenuButton.propTypes = Button.propTypes;
MenuButton.defaultProps = Button.defaultProps;

export function MenuButton({
	children,
	...props
}) {
	return (
		<Button
			{...props}
			type='button'
		>
			{children}
		</Button>
	);
}

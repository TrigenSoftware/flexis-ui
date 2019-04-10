import {
	PureComponent,
	ReactChild,
	MouseEvent
} from 'react';
import PropTypes from 'prop-types';

export interface ICustomFlatSelectOptionFacePassedProps {
	disabled?: boolean;
	onClick?(event: MouseEvent): void;
}

export interface ICustomFlatSelectOptionFaceProps {
	children(label: ReactChild, props: ICustomFlatSelectOptionFacePassedProps): ReactChild;
}

export const isCustomFlatSelectOptionFace = Symbol('isCustomFlatSelectOptionFace');

export function onCustomFlatSelectOptionFaceClick(event: MouseEvent) {

	const input = event.currentTarget.previousElementSibling as HTMLInputElement;

	input.click();
}

export class CustomFlatSelectOptionFace extends PureComponent<ICustomFlatSelectOptionFaceProps> {

	static [isCustomFlatSelectOptionFace] = true;

	static propTypes = {
		children: PropTypes.func.isRequired
	};

	render() {
		return null;
	}
}

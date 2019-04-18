import {
	PureComponent,
	ReactChild
} from 'react';
import PropTypes from 'prop-types';

export interface ICustomSelectFacePassedProps {
	multiple?: boolean;
	disabled?: boolean;
}

export interface ICustomSelectFaceProps {
	children(label: ReactChild, props: ICustomSelectFacePassedProps): ReactChild;
}

export const isCustomSelectFace = Symbol('isCustomSelectFace');

export class CustomSelectFace extends PureComponent<ICustomSelectFaceProps> {

	static [isCustomSelectFace] = true;

	static propTypes = {
		children: PropTypes.func.isRequired
	};

	render() {
		return null;
	}
}
